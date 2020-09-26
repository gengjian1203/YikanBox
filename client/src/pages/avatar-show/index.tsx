import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useState } from 'react'
import { shareType, processSharePath } from '@/utils/index'

import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import PanelShare from '@/components/PanelShare'

import ModuleCanvas from './components/module-canvas'
import ModuleJewelry from './components/module-jewelry'
import ModuleButton from './components/module-button'
import ModuleCanvasSave from './components/module-canvas-save'

import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

	const [isShowPanelShare, setShowPanelShare] = useState<boolean>(false) // 是否展示分享

	useShareAppMessage(res => {
		const sharePath = processSharePath({
			sharePath: path,
			shareType: shareType.PATH_ARTICLE,
		})
		console.log('useShareAppMessage', sharePath)
		return {
			title: '看我做了一个头像秀，并@了你',
			imageUrl: '',
			path: sharePath,
		}
	})

	// 分享弹窗
	const handleShowPanelShare = isShow => {
		setShowPanelShare(isShow)
	}

	return (
		<View className='avatar-show-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle='我的头像秀'
				colorBackgroud='#000000'
				colorTitle='#ffffff'
			/>
			{/* 头像主页面 */}
			<ModuleCanvas />
			{/* 底部操作区 */}
			<View className='avatar-show-bottom'>
				{/* 饰品栏 */}
				<ModuleJewelry />
				{/* 按钮区 */}
				<ModuleButton onShowPanelShare={handleShowPanelShare} />
			</View>

			{/* 屏外绘制保存的图片 */}
			<ModuleCanvasSave />
			{/* 分享面板 */}
			<PanelShare
				isShowPanelShare={isShowPanelShare}
				strQRCodeUrl=''
				onShowPanelShare={handleShowPanelShare}
			/>
		</View>
	)
}
