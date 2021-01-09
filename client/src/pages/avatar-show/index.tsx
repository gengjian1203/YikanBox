import Taro, { useRouter } from '@tarojs/taro'
import React, { useState } from 'react'

import { View } from '@tarojs/components'
import PageContent from '@/components/page-content'
import PanelShare from '@/components/panel-share'
import { shareType, processSharePath } from '@/utils/index'

import ModuleCanvas from './components/module-canvas'
import ModuleJewelry from './components/module-jewelry'
import ModuleButton from './components/module-button'
import ModuleCanvasSave from './components/module-canvas-save'

import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

	const [isShowPanelShare, setShowPanelShare] = useState<boolean>(false) // 是否展示分享面板
	const [strShareContentUrl, setShareContentUrl] = useState<string>('')

	// 分享弹窗
	const handleShowPanelShare = (isShow, strContentUrl) => {
		setShowPanelShare(isShow)
		console.log('handleShowPanelShare', strContentUrl)
		if (strContentUrl) {
			setShareContentUrl(strContentUrl)
		}
	}

	return (
		<PageContent
			customClass='avatar-show-wrap'
			isShowLeftIcon
			strNavigationTitle='我的头像秀'
		>
			{/* 头像主页面 */}
			<ModuleCanvas isShowPanelShare={isShowPanelShare} />
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
				strShareTitle='看我做了一个头像秀，并@了你'
				strShareImage=''
				strSharePath={processSharePath({
					sharePath: path,
					shareType: shareType.PATH_AVATAR_SHOW.name,
				})}
				strContentUrl={strShareContentUrl}
				onShowPanelShare={handleShowPanelShare}
			/>
		</PageContent>
	)
}
