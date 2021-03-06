/**
 * 点击同一个底部导航不做处理
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

interface IThrottleRef {
	funCallback: any
}

export function useSmartClick(funCallback = (any?: any) => any) {
	const { current } = useRef<IThrottleRef>({
		funCallback: () => true,
	})

	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)
	const strBottomBarListSelectId = useSelector(
		state => state.appInfo.objAppInfo.strBottomBarListSelectId
	)

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback(
		(...args) => {
			const arrTabBarBottomListTmp = arrBottomBarList.filter(item => {
				return item.enable === true
			})
			const nIndex = arrTabBarBottomListTmp.findIndex(item => {
				return item.id === strBottomBarListSelectId
			})
			if (nIndex !== args[0]) {
				current.funCallback.call(this, ...args)
			}
		},
		[arrBottomBarList, strBottomBarListSelectId]
	)
}

export default useSmartClick
