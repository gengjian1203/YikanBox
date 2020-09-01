import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

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
	onItemClick: any
}

export default function ItemBorder(props: IItemBorderProps) {
	const { objBorder = {}, onItemClick = () => true } = props

	// 点击头像框
	const handleItemClick = e => {
		console.log('handleItemClick', e)
		e.stopPropagation()
		onItemClick(objBorder)
	}

	return (
		<View className='border-item-wrap' onClick={useThrottle(handleItemClick)}>
			<View className='border-item-content flex-center-v'>
				<Image
					src={objBorder.urlBorder}
					mode='aspectFit'
					className={
						`item-image ` + `${objBorder.time === '' ? 'item-gray ' : ''}`
					}
				/>
				<View className={`item-name`}>{objBorder.name}</View>
			</View>
		</View>
	)
}
