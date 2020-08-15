import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import useThrottle from '@/hooks/useThrottle'

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

	return (
		<View className='module-common-wrap'>
			<ModuleTitle strTitle='常用功能' />
			<View className='module-common-content'>
				<View className='common-item'>
					<View className='common-item-icon bk-red iconfont icon-discover'></View>
					<View className='common-item-name'>个人资料</View>
				</View>
				<View className='common-item'>
					<View className='common-item-icon bk-green iconfont icon-mine'></View>
					<View className='common-item-name'>打卡记录</View>
				</View>
				<View className='common-item'>
					<View className='common-item-icon bk-blue iconfont icon-avatar'></View>
					<View className='common-item-name'>积分等级</View>
				</View>
			</View>
		</View>
	)
}
