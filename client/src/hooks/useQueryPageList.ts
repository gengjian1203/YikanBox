import Taro, {
	useDidShow,
	useReachBottom,
	usePullDownRefresh,
} from '@tarojs/taro'
import { useCallback, useEffect, useRef } from 'react'

const PAGE_SIZE = 15

const useQueryPageList = (callback: any, funFetchApi: any, param: any = {}) => {
	const nPageNum = useRef<number>(0)
	const arrPageList = useRef<Array<any>>([])
	const nPageSize = param.nPageSize ? param.nPageSize : PAGE_SIZE

	// // 重新加载
	// useDidShow(async () => {
	// 	console.log('useQueryPageList useDidShow')
	// 	callback({ state: 'LOADING' })
	// 	const paramReal = {
	// 		...param,
	// 		nPageNum: 0,
	// 		nPageSize: (nPageNum.current + 1) * nPageSize,
	// 	}
	// 	const res = await funFetchApi(paramReal)
	// 	arrPageList.current = res ? res.data : []
	// 	callback({ state: 'RESULT', data: arrPageList.current, total: 100000 })
	// })

	// 初次加载
	useEffect(() => {
		console.log('useQueryPageList useEffect')
		callback({ state: 'LOADING' })
		const paramReal = {
			...param,
			nPageNum: 0,
			nPageSize: nPageSize,
		}
		funFetchApi(paramReal).then(res => {
			arrPageList.current = res ? res.data : []
			callback({ state: 'RESULT', data: arrPageList.current })
		})
	}, [])

	// 触底加载分页
	useReachBottom(async () => {
		console.log('useQueryPageList useReachBottom')
		callback({ state: 'REACH_BOTTOM' })
		nPageNum.current++
		const paramReal = {
			...param,
			nPageNum: nPageNum.current,
			nPageSize: nPageSize,
		}
		const res = await funFetchApi(paramReal)
		arrPageList.current = arrPageList.current.concat(res ? res.data : [])
		callback({ state: 'RESULT', data: arrPageList.current })
	})

	// 下拉刷新
	usePullDownRefresh(async () => {
		console.log('useQueryPageList usePullDownRefresh')
		callback({ state: 'LOADING' })
		nPageNum.current = 0
		const paramReal = {
			...param,
			nPageNum: nPageNum.current,
			nPageSize: nPageSize,
		}
		const res = await funFetchApi(paramReal)
		arrPageList.current = res ? res.data : []
		callback({ state: 'RESULT', data: arrPageList.current })
	})
}

export default useQueryPageList
