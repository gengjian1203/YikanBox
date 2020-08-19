import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import { View } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'
interface IModuleCommonProps {}

export default function ModuleCommon(props: IModuleCommonProps) {
	const {} = props

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleMyselfDataClick = e => {
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	const handleClockInDataClick = e => {
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	const handleIntegralDataClick = e => {
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	return (
		<View className='module-common-wrap flex-center-v'>
			<ModuleTitle strTitle='常用功能' />
			<View className='module-common-content'>
				<View
					className='common-item flex-center-v'
					onClick={useThrottle(useCheckLogin(handleMyselfDataClick))}
				>
					<View className='common-item-icon flex-center bk-red iconfont icon-discover'></View>
					<View className='common-item-name'>个人资料</View>
				</View>
				<View
					className='common-item flex-center-v'
					onClick={useThrottle(useCheckLogin(handleClockInDataClick))}
				>
					<View className='common-item-icon flex-center bk-green iconfont icon-mine'></View>
					<View className='common-item-name'>打卡记录</View>
				</View>
				<View
					className='common-item flex-center-v'
					onClick={useThrottle(useCheckLogin(handleIntegralDataClick))}
				>
					<View className='common-item-icon flex-center bk-blue iconfont icon-avatar'></View>
					<View className='common-item-name'>积分等级</View>
				</View>
			</View>
		</View>
	)
}
