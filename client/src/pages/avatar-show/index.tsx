import Taro, { useRouter, useShareAppMessage, useDidShow } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useCheckLogin from '@/hooks/useCheckLogin'
import useIsLogin from '@/hooks/useIsLogin'
import useThrottle from '@/hooks/useThrottle'

import { shareType, processSharePath, getHDAvatarUrl } from '@/utils/index'

import { View, Image, Canvas, ScrollView } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'
import ButtonBottom from '@/components/ButtonBottom'
import NavigationHeader from '@/components/NavigationHeader'

import strDefaultAvatarUrl from '@/images/avatar/default.png'

import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	arrJewelryList,
	arrActionSheetList,
} from './utils/const'
import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

	const [isShowActionSheet, setShowActionSheet] = useState<boolean>(false) // 是否展示弹窗

	const [canvas, setCanvas] = useState<any>(null)
	const [strImageAvatar, setImageAvatar] = useState<string>('') // 头像Url
	const [strImageJewelry, setImageJewelry] = useState<string>('') // 饰品Url
	const [nImageJewelryX, setImageJewelryX] = useState<number>(0) // 饰品坐标X - 原始
	const [nImageJewelryX_offset, setImageJewelryX_offset] = useState<number>(0) // 饰品坐标X - 偏移
	const [nImageJewelryY, setImageJewelryY] = useState<number>(0) // 饰品坐标Y - 原始
	const [nImageJewelryY_offset, setImageJewelryY_offset] = useState<number>(0) // 饰品坐标Y - 偏移
	const [nImageJewelryW, setImageJewelryW] = useState<number>(200) // 饰品width - 原始
	const [nImageJewelryW_offset, setImageJewelryW_offset] = useState<number>(200) // 饰品width - 偏移
	const [nImageJewelryH, setImageJewelryH] = useState<number>(200) // 饰品height - 原始
	const [nImageJewelryH_offset, setImageJewelryH_offset] = useState<number>(200) // 饰品height - 偏移
	const [strImageText, setImageText] = useState<string>('') // 文字

	const [nTouchStartX, setTouchStartX] = useState<number>(0) // 触摸点坐标X
	const [nTouchStartY, setTouchStartY] = useState<number>(0) // 触摸点坐标Y

	const store = useSelector(state => state)
	const memberInfo = useSelector(state => state.memberInfo)

	const isLogin = useIsLogin()

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
						setImageAvatar(res.tempFilePath)
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
						Taro.hideLoading()
						Taro.showToast({
							title: '保存成功',
							icon: 'success',
						})
					},
				})
			},
		})
	}

	// 重新绘制canvas
	const drawCanvas = () => {
		console.log('drawCanvas.')
		if (canvas) {
			// 绘制头像底图
			if (strImageAvatar) {
				canvas.drawImage(strImageAvatar, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
			} else {
				console.log('drawCanvas strImageAvatar is null.')
			}
			// 绘制饰品
			if (strImageJewelry) {
				canvas.drawImage(
					strImageJewelry,
					nImageJewelryX + nImageJewelryX_offset,
					nImageJewelryY + nImageJewelryY_offset,
					nImageJewelryW + nImageJewelryW_offset,
					nImageJewelryH + nImageJewelryH_offset
				)
			}
			// 绘制测试
			canvas.fillStyle = 'red'
			canvas.setFontSize(50)
			canvas.fillText(
				strImageText,
				nImageJewelryX + nImageJewelryX_offset,
				nImageJewelryY + nImageJewelryY_offset
			)
			// 绘制
			canvas.draw()
		} else {
			console.log('drawCanvas canvas is null.')
		}
	}

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

	const onLoad = () => {
		console.log('AvatarShow onload')
		// 设置 canvas 对象
		setCanvas(Taro.createCanvasContext('canvas'))
		// 加载头像
		setImageAvatar(strDefaultAvatarUrl)
	}

	useEffect(() => {
		onLoad()
	}, [])

	const onShow = () => {}

	useDidShow(() => {
		onShow()
	})

	useEffect(() => {
		drawCanvas()
	}, [
		canvas,
		strImageAvatar,
		strImageJewelry,
		// nImageJewelryX,
		// nImageJewelryY,
		// nImageJewelryW,
		// nImageJewelryH,
		nImageJewelryX_offset,
		nImageJewelryY_offset,
		nImageJewelryW_offset,
		nImageJewelryH_offset,
		strImageText,
	])

	// 点击使用自身头像
	const funToggleAvatar = () => {
		Taro.downloadFile({
			url: getHDAvatarUrl(memberInfo.user_avatarUrl),
			success: res => {
				console.log('AvatarShow downloadFile', res)
				setImageAvatar(res.tempFilePath)
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

	// Canvas触碰开始
	const handleCanvasTouchStart = e => {
		console.log('handleCanvasTouchStart', e)
		// 初始化数据
		const point = e.touches[0]
		setTouchStartX(point.x)
		setTouchStartY(point.y)
	}

	// Canvas触碰移动
	const handleCanvasTouchMove = e => {
		console.log('handleCanvasTouchMove', e)
		// drawCanvas()
		const point = e.touches[0]
		setImageJewelryX_offset(point.x - nTouchStartX)
		setImageJewelryY_offset(point.y - nTouchStartY)
	}

	// Canvas触碰停止
	const handleCanvasTouchEnd = e => {
		console.log('handleCanvasTouchEnd', e)
		// 保存修改数据
		setTimeout(() => {
			setImageJewelryX(pervX => {
				return pervX + nImageJewelryX_offset
			})
			setImageJewelryX_offset(0)
		}, 0)
		setTimeout(() => {
			setImageJewelryY(pervY => {
				return pervY + nImageJewelryY_offset
			})
			setImageJewelryY_offset(0)
		}, 0)
		setTimeout(() => {
			setImageJewelryW(pervW => {
				return pervW + nImageJewelryW_offset
			})
			setImageJewelryW_offset(0)
		}, 0)
		setTimeout(() => {
			setImageJewelryH(pervH => {
				return pervH + nImageJewelryH_offset
			})
			setImageJewelryH_offset(0)
		}, 0)
	}

	// 点击饰品
	const handleJewelryItemClick = item => {
		console.log('handleJewelryItemClick', item)
		setImageJewelryX(item.x)
		setImageJewelryY(item.y)
		setImageText(item.name)
	}

	// 点击更换图片
	const handleButtonChangeClick = () => {
		console.log('handleButtonPhotoClick')
		setShowActionSheet(true)
	}

	// 点击保存图片
	const handleButtonSaveClick = () => {
		console.log('handleButtonSaveClick')
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

	const renderModuleJewelry = () => {
		return (
			<View className='avatar-show-jewelry'>
				<ScrollView className='jewelry-content' scrollX>
					{arrJewelryList.map((item, index) => {
						return (
							<View
								key={index}
								className='jewelry-item'
								onClick={() => handleJewelryItemClick(item)}
							>
								<View className='item-content flex-center'>{item.name}</View>
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}

	return (
		<View className='avatar-show-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的头像秀' />
			{/* 头像主页面 */}
			<View className='avatar-show-content flex-center'>
				<Canvas
					canvasId='canvas'
					disableScroll
					style={
						`width: ${Taro.pxTransform(CANVAS_WIDTH * 2)}; ` +
						`height: ${Taro.pxTransform(CANVAS_HEIGHT * 2)}; `
					}
					className='avatar-show-canvas'
					onTouchStart={handleCanvasTouchStart}
					onTouchMove={handleCanvasTouchMove}
					onTouchEnd={handleCanvasTouchEnd}
				/>
			</View>

			{/* 底部操作区 */}
			<View className='avatar-show-bottom'>
				{/* 饰品栏 */}
				{renderModuleJewelry()}
				{/* 按钮 */}
				<ButtonBottom
					fixed={false}
					title='更换图片'
					customPanelClass='bottom-button-panel'
					onButtonClick={useThrottle(useCheckLogin(handleButtonChangeClick))}
				/>
				{/* 按钮 */}
				<ButtonBottom
					fixed={false}
					title='保存'
					customPanelClass='bottom-button-panel'
					onButtonClick={useThrottle(useCheckLogin(handleButtonSaveClick))}
				/>
			</View>

			{/* 弹窗操作区 */}
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
		</View>
	)
}
