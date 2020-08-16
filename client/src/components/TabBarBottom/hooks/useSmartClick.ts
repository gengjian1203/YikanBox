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

	const objBottomBarInfo = useSelector(state => state.appInfo.objBottomBarInfo)

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback(
		(...args) => {
			if (objBottomBarInfo.nSelectIndex !== args[0]) {
				current.funCallback.call(this, ...args)
			}
		},
		[objBottomBarInfo]
	)
}

export default useSmartClick
