import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import avatarShowInfoActions from '@/redux/actions/avatarShowInfo'
import useCheckLogin from '@/hooks/useCheckLogin'
import useThrottle from '@/hooks/useThrottle'
import { getHDAvatarUrl } from '@/utils/index'

import { View, Block } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import ButtonBottom from '@/components/ButtonBottom'

import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	arrActionSheetList,
} from '../../utils/const'

import './index.scss'

interface IModuleBottomProps {}

export default function ModuleBottom(props: IModuleBottomProps) {
	const {} = props

	const [isShowActionSheet, setShowActionSheet] = useState<boolean>(false) // 是否展示弹窗

	const memberInfo = useSelector(state => state.memberInfo)

	const {
		initAvatarInfo,
		setAvatarImage,
		setAvatarJewelry,
		setSelectJewelry,
	} = useActions(avatarShowInfoActions)

	// 选择图片
	const chooseImage = (
		sourceType: 'album' | 'camera' | 'user' | 'environment'
	) => {
		Taro.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: [sourceType],
			success: res => {
				console.log('funToggleCamera', res)
				const strTempPath = res.tempFilePaths[0]
				Taro.downloadFile({
					url: strTempPath,
					success: res => {
						console.log('AvatarShow downloadFile', res)
						setAvatarImage(res.tempFilePath)
					},
				})
			},
		})
	}

	// 保存并导出头像
	const saveAndExportAvatar = () => {
		console.log('exportAndSaveAvatar')
		Taro.showLoading()
		Taro.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: CANVAS_WIDTH,
			height: CANVAS_HEIGHT,
			destWidth: CANVAS_WIDTH,
			destHeight: CANVAS_HEIGHT,
			canvasId: 'canvas',
			success: resToCanvas => {
				console.log('resToCanvas', resToCanvas)
				Taro.saveImageToPhotosAlbum({
					filePath: resToCanvas.tempFilePath,
					success: resSaveImage => {
						console.log('resSaveImage', resSaveImage)
						Taro.showToast({
							title: '保存成功',
							icon: 'success',
						})
					},
				})
			},
		})
	}

	// 点击使用自身头像
	const funToggleAvatar = () => {
		Taro.downloadFile({
			url: getHDAvatarUrl(memberInfo.user_avatarUrl),
			success: res => {
				console.log('AvatarShow downloadFile', res)
				setAvatarImage(res.tempFilePath)
			},
		})
	}

	// 点击拍照
	const funToggleCamera = () => {
		chooseImage('camera')
	}

	// 从手机相册选择
	const funToggleAlbum = () => {
		chooseImage('album')
	}

	// 点击更换图片
	const handleButtonChangeClick = () => {
		console.log('handleButtonPhotoClick')
		setShowActionSheet(true)
	}

	// 点击保存图片
	const handleButtonSaveClick = () => {
		console.log('handleButtonSaveClick')
		setSelectJewelry({})
		saveAndExportAvatar()
		// Taro.navigateBack()
	}

	// 底部弹窗的关闭事件
	const handleActionSheetClose = () => {
		console.log('handleActionSheetClose')
		setShowActionSheet(false)
	}

	// 底部弹窗项的点击事件
	const handleActionSheetItemClick = item => {
		console.log('handleActionSheetItemClick', item)
		switch (item.code) {
			case 'toggle-avatar':
				funToggleAvatar()
				break
			case 'toggle-camera':
				funToggleCamera()
				break
			case 'toggle-album':
				funToggleAlbum()
				break
			default:
				break
		}
		setShowActionSheet(false)
	}

	return (
		<Block>
			<View className='avatar-show-bottom'>
				{/* 按钮 */}
				<ButtonBottom
					fixed={false}
					title='更换头像'
					customPanelClass='bottom-button-panel'
					onButtonClick={useThrottle(useCheckLogin(handleButtonChangeClick))}
				/>
				{/* 按钮 */}
				<ButtonBottom
					fixed={false}
					openType='share'
					title='保存并分享'
					customPanelClass='bottom-button-panel'
					onButtonClick={useThrottle(useCheckLogin(handleButtonSaveClick))}
				/>
			</View>

			{/* 弹窗区 */}
			<AtActionSheet
				isOpened={isShowActionSheet}
				cancelText='取消'
				onCancel={handleActionSheetClose}
				onClose={handleActionSheetClose}
			>
				{arrActionSheetList.map((item, index) => {
					return (
						<AtActionSheetItem
							key={index}
							onClick={() => handleActionSheetItemClick(item)}
						>
							{item.name}
						</AtActionSheetItem>
					)
				})}
			</AtActionSheet>
		</Block>
	)
}
