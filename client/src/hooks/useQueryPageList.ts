import Taro, {
	useDidShow,
	useReachBottom,
	usePullDownRefresh,
} from '@tarojs/taro'
import { useEffect, useRef } from 'react'
import useDebounce from '@/hooks/useDebounce'

const PAGE_NUM_LOCK = 2
const PAGE_SIZE = 20

/**
 * @param callback 获取到的列表数据回调函数
 * @param funFetchApi 请求数据的接口函数
 * @param param 请求数据的必要参数
 * @param isUpdateList 修改则主动触发onShow刷新
 */
const useQueryPageList = (
	callback: any,
	funFetchApi: any = null,
	param: any = {},
	isUpdateList: boolean = false
) => {
	const nPageNum = useRef<number>(0)
	const nTotalCount = useRef<number>(0)
	const arrPageList = useRef<Array<any>>([])

	const isInitComplate = useRef<boolean>(false)
	const funFetchApiTmp = useRef(undefined)
	const paramTmp = useRef(undefined)

	const nPageSize = param.nPageSize ? param.nPageSize : PAGE_SIZE

	/**
	 * 统一处理接口返回数据
	 * @param res
	 */
	const dealFetchResult = (res: any) => {
		const list = res?.data ? res.data : []
		const totalCount =
			res?.totalCount === undefined
				? 9999
				: res?.totalCount
				? res?.totalCount
				: 0
		nTotalCount.current = totalCount
		return {
			list,
			totalCount,
		}
	}

	/**
	 * 统一返回结果数据
	 */
	const returnCallBack = () => {
		callback &&
			callback({
				state: 'RESULT',
				list: arrPageList.current,
				totalCount: nTotalCount.current,
			})
	}

	/**
	 * 监听funFetchApi、param其中之一发生变化：重新请求一次第一分页
	 * 新增防抖操作，只取短时间内最后一次的请求结果
	 */
	useEffect(
		useDebounce(() => {
			console.log('useQueryPageList useUpdateApiOrParam0', funFetchApi, param)
			const isNotUndefined =
				!(funFetchApi === undefined) && !(param === undefined)
			const isDiff =
				funFetchApiTmp.current !== funFetchApi ||
				JSON.stringify(paramTmp.current) !== JSON.stringify(param)
			if (isNotUndefined && isDiff) {
				funFetchApiTmp.current = funFetchApi
				paramTmp.current = param
				nPageNum.current = 0
				callback && callback({ state: 'LOADING' })
				const paramReal = {
					...param,
					nPageNum: nPageNum.current,
					nPageSize: nPageSize,
				}
				funFetchApi &&
					funFetchApi(paramReal).then(res => {
						console.log('useQueryPageList useUpdateApiOrParam', res)
						const { list } = dealFetchResult(res)
						arrPageList.current = list
						isInitComplate.current = true
						returnCallBack()
					})
			}
		}, 500),
		[funFetchApi, param]
	)

	/**
	 * 监听isUpdateList变化：用于主动触发刷新
	 */
	useEffect(() => {
		if (!callback || !funFetchApi) {
			return
		}
		if (isInitComplate.current) {
			callback({ state: 'LOADING' })
			// 一次最多加载(PAGE_NUM_LOCK + 1) * PAGE_SIZE条数据
			nPageNum.current =
				nPageNum.current >= PAGE_NUM_LOCK ? PAGE_NUM_LOCK : nPageNum.current
			const paramReal = {
				...param,
				nPageNum: 0,
				nPageSize: (nPageNum.current + 1) * nPageSize,
			}
			funFetchApi &&
				funFetchApi(paramReal).then(res => {
					console.log('useQueryPageList useUpdateList', res)
					const { list } = dealFetchResult(res)
					arrPageList.current = list
					returnCallBack()
				})
		}
	}, [isUpdateList])

	/**
	 * onShow声明周期：重新获取数据（注：第一次进入页面虽触发onShow不过不执行获取数据操作）
	 */
	useDidShow(() => {
		if (!callback || !funFetchApi) {
			return
		}
		if (isInitComplate.current) {
			callback({ state: 'LOADING' })
			// 一次最多加载PAGE_NUM_LOCK * PAGE_SIZE条数据
			nPageNum.current =
				nPageNum.current >= PAGE_NUM_LOCK ? PAGE_NUM_LOCK : nPageNum.current
			const paramReal = {
				...param,
				nPageNum: 0,
				nPageSize: (nPageNum.current + 1) * nPageSize,
			}
			funFetchApi &&
				funFetchApi(paramReal).then(res => {
					console.log('useQueryPageList useDidShow', res)
					const { list } = dealFetchResult(res)
					arrPageList.current = list
					returnCallBack()
				})
		}
	})

	/**
	 * 触底生命周期：加载下一分页数据
	 */
	useReachBottom(() => {
		if (!callback || !funFetchApi) {
			return
		}
		if (nPageNum.current * nPageSize > nTotalCount.current) {
			return
		}
		callback({ state: 'REACH_BOTTOM' })
		nPageNum.current++
		const paramReal = {
			...param,
			nPageNum: nPageNum.current,
			nPageSize: nPageSize,
		}
		funFetchApi &&
			funFetchApi(paramReal).then(res => {
				console.log('useQueryPageList useReachBottom', res)
				const { list } = dealFetchResult(res)
				arrPageList.current = arrPageList.current.concat(list)
				returnCallBack()
			})
	})

	/**
	 * 下拉刷新生命周期：重新加载第一分页数据
	 */
	usePullDownRefresh(() => {
		if (!callback || !funFetchApi) {
			return
		}
		console.log('useQueryPageList usePullDownRefresh')
		callback({ state: 'LOADING' })
		nPageNum.current = 0
		const paramReal = {
			...param,
			nPageNum: nPageNum.current,
			nPageSize: nPageSize,
		}
		funFetchApi &&
			funFetchApi(paramReal).then(res => {
				console.log('useQueryPageList usePullDownRefresh', res)
				const { list } = dealFetchResult(res)
				arrPageList.current = list
				returnCallBack()
			})
	})
}

export default useQueryPageList
