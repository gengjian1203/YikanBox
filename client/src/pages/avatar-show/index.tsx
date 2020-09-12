import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React from 'react'
import { useSelector } from 'react-redux'
import { shareType, processSharePath } from '@/utils/index'

import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import ModuleCanvas from './components/module-canvas'
import ModuleJewelry from './components/module-jewelry'
import ModuleBottom from './components/module-bottom'

import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

	const store = useSelector(state => state)

	useShareAppMessage(res => {
		const sharePath = processSharePath(
			{
				sharePath: path,
				shareType: shareType.PATH_ARTICLE,
			},
			store
		)
		console.log('useShareAppMessage', sharePath)
		return {
			title: '看我做了一个头像秀，并@了你',
			imageUrl: '',
			path: sharePath,
		}
	})

	return (
		<View className='avatar-show-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的头像秀' />
			{/* 头像主页面 */}
			<ModuleCanvas />
			{/* 饰品栏 */}
			<ModuleJewelry />
			{/* 底部操作区 */}
			<ModuleBottom />
		</View>
	)
}
