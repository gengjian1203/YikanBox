import Taro, { useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View, Image, Block, Canvas } from '@tarojs/components'
import { AtButton, AtCurtain } from 'taro-ui'

import useCheckAuthorize from '@/hooks/useCheckAuthorize'
import useThrottle from '@/hooks/useThrottle'
import QRCodeManager from '@/services/QRCodeManager'

import { PANEL_SHARE_WIDTH, PANEL_SHARE_HEIGHT } from './utils/config'
import { drawCanvasShare } from './utils/index'

import './index.scss'

interface IPanelShareProps {
	isShowPanelShare: boolean
	strShareTitle: string
	strShareImage: string
	strSharePath: string
	strContentUrl: string
	onShowPanelShare: any
}

export default function PanelShare(props: IPanelShareProps) {
	const {
		isShowPanelShare = false,
		strShareTitle = '',
		strShareImage = '',
		strSharePath = '',
		strContentUrl = '',
		onShowPanelShare = () => true,
	} = props

	const [strSharePhotoUrl, setSharePhotoUrl] = useState<string>('')
	const [canvasShare, setCanvasShare] = useState<any>(null)

	// 更新海报canvas
	const updateCanvasShare = async () => {
		Taro.showLoading({
			title: '生成海报中',
			mask: true,
		})
		const strQRCodeUrl = await QRCodeManager.getQRCode(strSharePath)
		console.log('updateCanvasShare strQRCodeUrl', strQRCodeUrl)
		drawCanvasShare(canvasShare, strContentUrl, strQRCodeUrl, 2)
		canvasShare.draw(true, () => {
			Taro.hideLoading()
			Taro.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: PANEL_SHARE_WIDTH * 2,
				height: PANEL_SHARE_HEIGHT * 2,
				destWidth: PANEL_SHARE_WIDTH * 2,
				destHeight: PANEL_SHARE_HEIGHT * 2,
				fileType: 'jpg',
				canvasId: 'canvas-share',
				success: resToCanvas => {
					console.log('resToCanvas', resToCanvas)
					setSharePhotoUrl(resToCanvas.tempFilePath)
				},
				fail: err => {
					Taro.showToast({
						title: '生成海报失败',
						icon: 'none',
					})
				},
			})
		})
	}

	const onLoad = () => {
		// 设置 canvas 对象
		setCanvasShare(Taro.createCanvasContext('canvas-share'))
	}

	useEffect(() => {
		onLoad()
	}, [])

	useEffect(() => {
		console.log('PanelShare', isShowPanelShare)
		if (isShowPanelShare && strContentUrl !== '') {
			updateCanvasShare()
		}
		return () => {}
	}, [isShowPanelShare, strContentUrl])

	useShareAppMessage(res => {
		// const sharePath = processSharePath({
		// 	sharePath: path,
		// 	shareType: strShareType,
		// })
		console.log('useShareAppMessage', strSharePath)
		return {
			title: strShareTitle,
			imageUrl: strShareImage,
			path: strSharePath,
		}
	})

	// 关闭分享幕帘
	const handlePanelShareClose = () => {
		onShowPanelShare(false)
	}

	// 保存海报
	const handleDownloadClick = () => {
		console.log('handleDownloadClick')
		Taro.saveImageToPhotosAlbum({
			filePath: strSharePhotoUrl,
			success: resSaveImage => {
				console.log('resSaveImage', resSaveImage)
				Taro.showToast({
					title: '保存成功',
					icon: 'success',
				})
			},
			fail: err => {
				console.log('handleDownloadClick', err)
				if ('saveImageToPhotosAlbum:fail auth deny')
					Taro.showToast({
						title: '保存失败',
						icon: 'none',
					})
			},
		})
	}

	return (
		<Block>
			{/* 幕帘弹窗 */}
			<AtCurtain
				className='panel-share-wrap'
				isOpened={isShowPanelShare}
				closeBtnPosition='bottom'
				onClose={handlePanelShareClose}
			>
				<View
					className='share-content'
					style={
						`width: ${PANEL_SHARE_WIDTH}px;` +
						`height: ${PANEL_SHARE_HEIGHT}px;`
					}
				>
					<Image
						className='share-img'
						style={
							`width: ${PANEL_SHARE_WIDTH}px;` +
							`height: ${PANEL_SHARE_HEIGHT}px;`
						}
						src={strSharePhotoUrl}
						mode='widthFix'
						showMenuByLongpress
					/>
					{/* <AtButton className='content-btn-icon flex-center content-btn-left'>
						<View className='iconfont icon-arrow-left'></View>
					</AtButton>
					<AtButton className='content-btn-icon flex-center content-btn-right'>
						<View className='iconfont icon-arrow-right'></View>
					</AtButton> */}
				</View>
				<View className='share-text'>长按图片，可快捷转发哦！</View>
				<View className='share-button-wrap flex-around-h'>
					<View className='share-button flex-between-v'>
						<AtButton
							className='float-btn-icon flex-center bk-green'
							openType='share'
						>
							<View className='iconfont icon-share-wechat'></View>
						</AtButton>
						<View className='btn-text'>分享链接</View>
					</View>
					<View className='share-button flex-between-v'>
						<AtButton
							className='float-btn-icon flex-center bk-blue'
							onClick={useThrottle(
								useCheckAuthorize('scope.writePhotosAlbum', handleDownloadClick)
							)}
						>
							<View className='iconfont icon-share-download'></View>
						</AtButton>
						<View className='btn-text'>保存海报</View>
					</View>
					<View className='share-button flex-between-v'>
						<AtButton
							className='float-btn-icon flex-center bk-yellow'
							onClick={useThrottle(handlePanelShareClose)}
						>
							<View className='iconfont icon-share-close'></View>
						</AtButton>
						<View className='btn-text'>关闭</View>
					</View>
				</View>
			</AtCurtain>

			{/* 屏外绘制分享的海报 */}
			<Canvas
				canvasId='canvas-share'
				disableScroll
				style={
					`position: fixed; ` +
					`top: -999px; ` +
					`left: -999px; ` +
					`width: ${PANEL_SHARE_WIDTH * 2}px; ` +
					`height: ${PANEL_SHARE_HEIGHT * 2}px; `
				}
			/>
		</Block>
	)
}
