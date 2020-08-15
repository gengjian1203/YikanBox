/**
 * 节流Hook
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from 'react'

interface IThrottleRef {
	funThrottle: any
	nTimestamp: number
}

export function useThrottle(
	funThrottle = (any?: any) => any,
	delay = 1000,
	dep = []
) {
	const { current } = useRef<IThrottleRef>({
		funThrottle: () => true,
		nTimestamp: 0,
	})

	useEffect(() => {
		current.funThrottle = funThrottle
	}, [funThrottle])

	return useCallback((...args) => {
		const now = Date.now()
		if (now - current.nTimestamp > delay) {
			current.nTimestamp = now
			current.funThrottle.call(this, ...args)
		}
	}, dep)
}

export default useThrottle
