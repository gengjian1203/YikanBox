import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View, Image, Block, Canvas } from '@tarojs/components'
import { AtButton, AtCurtain } from 'taro-ui'
import {
	PANEL_SHARE_WIDTH,
	PANEL_SHARE_HEIGHT,
	drawCanvasShare,
} from '@/utils/index'

import './index.scss'

interface IPanelShareProps {
	isShowPanelShare: boolean
	strQRCodeUrl: string
	onShowPanelShare: any
}

export default function PanelShare(props: IPanelShareProps) {
	const {
		isShowPanelShare = false,
		strQRCodeUrl = '',
		onShowPanelShare = (any: any) => true,
	} = props

	const [strSharePhotoUrl, setSharePhotoUrl] = useState<string>('')
	const [canvasShare, setCanvasShare] = useState<any>(null)

	const avatarShowInfo = useSelector(
		state =>
			state.avatarShowInfo.arrAvatarShowList[
				state.avatarShowInfo.nAvatarShowListPoint
			]
	)

	const onLoad = () => {
		// 设置 canvas 对象
		setCanvasShare(Taro.createCanvasContext('canvas-share'))
	}

	useEffect(() => {
		onLoad()
	}, [])

	useEffect(() => {
		console.log('PanelShare', isShowPanelShare)
		if (isShowPanelShare) {
			drawCanvasShare(canvasShare, avatarShowInfo)
			canvasShare.draw(true, () => {
				Taro.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: PANEL_SHARE_WIDTH,
					height: PANEL_SHARE_HEIGHT,
					destWidth: PANEL_SHARE_WIDTH,
					destHeight: PANEL_SHARE_HEIGHT,
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
		return () => {}
	}, [isShowPanelShare])

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
				<Image
					className='share-img'
					src={strSharePhotoUrl}
					mode='widthFix'
					showMenuByLongpress
				/>
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
							onClick={handleDownloadClick}
						>
							<View className='iconfont icon-share-download'></View>
						</AtButton>
						<View className='btn-text'>保存海报</View>
					</View>
					<View className='share-button flex-between-v'>
						<AtButton
							className='float-btn-icon flex-center bk-yellow'
							onClick={handlePanelShareClose}
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
					`width: ${PANEL_SHARE_WIDTH}px; ` +
					`height: ${PANEL_SHARE_HEIGHT}px; `
				}
			/>
		</Block>
	)
}
