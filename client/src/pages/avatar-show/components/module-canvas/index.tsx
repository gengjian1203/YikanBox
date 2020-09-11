import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import avatarShowInfoActions from '@/redux/actions/avatarShowInfo'
import strDefaultAvatarUrl from '@/images/avatar/default.png'

import { View, Block, Canvas } from '@tarojs/components'

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../utils/const'
import { drawMainCanvas } from '../../utils/canvas'

import './index.scss'

interface IModuleCanvasProps {}

export default function ModuleCanvas(props: IModuleCanvasProps) {
	const {} = props

	const [canvas, setCanvas] = useState<any>(null)
	const [objTouchPoint, setTouchPoint] = useState<any>({
		nTouchStartX: 0, // 触摸点X起始坐标
		nTouchStartX_offset: 0, // 触摸点X偏移
		nTouchStartY: 0, // 触摸点Y起始坐标
		nTouchStartY_offset: 0, // 触摸点Y偏移
	})

	const avatarShowInfo = useSelector(state => state.avatarShowInfo)

	const {
		initAvatarInfo,
		setAvatarImage,
		setAvatarJewelry,
		setSelectJewelry,
	} = useActions(avatarShowInfoActions)

	useEffect(() => {
		// 设置 canvas 对象
		setCanvas(Taro.createCanvasContext('canvas'))
		// 加载头像
		setAvatarImage(strDefaultAvatarUrl)
	}, [])

	useEffect(() => {
		drawMainCanvas(canvas, avatarShowInfo)
	}, [
		canvas,
		avatarShowInfo,
		// strImageAvatar,
		// strImageJewelry,
		// // nImageJewelryX,
		// // nImageJewelryY,
		// // nImageJewelryW,
		// // nImageJewelryH,
		// nImageJewelryX_offset,
		// nImageJewelryY_offset,
		// nImageJewelryW_offset,
		// nImageJewelryH_offset,
		// strImageText,
	])

	// Canvas触碰开始
	const handleCanvasTouchStart = e => {
		console.log('handleCanvasTouchStart', e)
		// 初始化数据
		const point = e.touches[0]
		setTouchPoint({
			...objTouchPoint,
			nTouchStartX: point.x,
			nTouchStartY: point.y,
		})
	}

	// Canvas触碰移动
	const handleCanvasTouchMove = e => {
		console.log('handleCanvasTouchMove', e)
		const point = e.touches[0]
		setTouchPoint({
			...objTouchPoint,
			nTouchStartX_offset: point.x - objTouchPoint.nTouchStartX,
			nTouchStartY_offset: point.y - objTouchPoint.nTouchStartY,
		})
	}

	// Canvas触碰停止
	const handleCanvasTouchEnd = e => {
		console.log('handleCanvasTouchEnd', e)
		// 保存修改数据
		// setTimeout(() => {
		// 	setImageJewelryX(pervX => {
		// 		return pervX + nImageJewelryX_offset
		// 	})
		// 	setImageJewelryX_offset(0)
		// }, 0)
		// setTimeout(() => {
		// 	setImageJewelryY(pervY => {
		// 		return pervY + nImageJewelryY_offset
		// 	})
		// 	setImageJewelryY_offset(0)
		// }, 0)
		// setTimeout(() => {
		// 	setImageJewelryW(pervW => {
		// 		return pervW + nImageJewelryW_offset
		// 	})
		// 	setImageJewelryW_offset(0)
		// }, 0)
		// setTimeout(() => {
		// 	setImageJewelryH(pervH => {
		// 		return pervH + nImageJewelryH_offset
		// 	})
		// 	setImageJewelryH_offset(0)
		// }, 0)
	}

	return (
		<Block>
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
		</Block>
	)
}
