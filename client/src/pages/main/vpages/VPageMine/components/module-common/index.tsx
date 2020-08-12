import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { View, Image } from '@tarojs/components'

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
			<View className='common-title'>常用功能</View>
			<View className='common-content'>
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
