import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useCheckLogin from '@/hooks/useCheckLogin'
import useThrottle from '@/hooks/useThrottle'

import { shareType, processSharePath, getHDAvatarUrl } from '@/utils/index'

import { View, Image, Canvas, ScrollView } from '@tarojs/components'
import ButtonBottom from '@/components/ButtonBottom'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

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

	const [nTouchStartX, setTouchStartX] = useState<number>(0) // 触摸点坐标X
	const [nTouchStartY, setTouchStartY] = useState<number>(0) // 触摸点坐标Y

	const store = useSelector(state => state)
	const memberInfo = useSelector(state => state.memberInfo)

	const CANVAS_WIDTH = 300
	const CANVAS_HEIGHT = 300

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
				'Hello',
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
		// 下载头像
		Taro.downloadFile({
			url: getHDAvatarUrl(memberInfo.user_avatarUrl),
			success: res => {
				console.log('AvatarShow downloadFile', res)
				setImageAvatar(res.tempFilePath)
			},
		})
	}

	useEffect(() => {
		onLoad()
	}, [])

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
	])

	const handleCanvasTouchStart = e => {
		console.log('handleCanvasTouchStart', e)
		// 初始化数据
		const point = e.touches[0]
		setTouchStartX(point.x)
		setTouchStartY(point.y)
	}

	const handleCanvasTouchMove = e => {
		console.log('handleCanvasTouchMove', e)
		// drawCanvas()
		const point = e.touches[0]
		setImageJewelryX_offset(point.x - nTouchStartX)
		setImageJewelryY_offset(point.y - nTouchStartY)
	}

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

	const handleButtonSaveClick = () => {
		console.log('handleButtonSaveClick')
		saveAndExportAvatar()
		// Taro.navigateBack()
	}

	const renderModuleJewelry = () => {
		return (
			<View className='avatar-show-jewelry'>
				{/* <ModuleTitle strTitle='饰品栏' /> */}
				<ScrollView className='jewelry-content' scrollX>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>1</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>2</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>3</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>4</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>5</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>6</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>7</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>8</View>
					</View>
					<View className='jewelry-item'>
						<View className='item-content flex-center'>9</View>
					</View>
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
					title='保存'
					onButtonClick={handleButtonSaveClick}
				/>
			</View>
		</View>
	)
}
