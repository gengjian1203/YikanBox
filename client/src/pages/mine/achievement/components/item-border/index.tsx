import Taro from '@tarojs/taro'
import React from 'react'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'

import './index.scss'

interface IBorderInfoType {
	code?: string
	urlBorder?: string
	name?: string
	describe?: string
	time?: string
}

interface IItemBorderProps {
	objBorder: IBorderInfoType
	strBorderSelectCode: string // 选中的头像框
	onItemClick: any
}

export default function ItemBorder(props: IItemBorderProps) {
	const {
		objBorder = {},
		strBorderSelectCode = '',
		onItemClick = () => true,
	} = props

	// 点击头像框
	const handleItemClick = e => {
		console.log('handleItemClick', e)
		e.stopPropagation()
		onItemClick(objBorder)
	}

	return (
		<View className='border-item-wrap' onClick={useThrottle(handleItemClick)}>
			<View className={`border-item-content ` + `flex-center-v `}>
				{/* 选中框 */}
				{objBorder.code === strBorderSelectCode && (
					<View className='item-select'></View>
				)}
				{/* 头像框图片 */}
				<Image
					src={objBorder.urlBorder}
					mode='aspectFit'
					className={
						`item-image ` + `${objBorder.time === '' ? 'item-gray ' : ''}`
					}
				/>
				{/* 头像框名称 */}
				<View className={`item-name`}>{objBorder.name}</View>
			</View>
		</View>
	)
}
