import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

interface IBadgeInfoType {
	code?: string
	urlBadge?: string
	name?: string
	describe?: string
	time?: string
}

interface IItemBadgeProps {
	objBadge: IBadgeInfoType
	onItemClick: any
}

export default function ItemBadge(props: IItemBadgeProps) {
	const { objBadge = {}, onItemClick = () => true } = props

	// 点击徽章
	const handleItemClick = e => {
		console.log('handleItemClick', e)
		e.stopPropagation()
		onItemClick(objBadge)
	}

	return (
		<View className='badge-item-wrap' onClick={useThrottle(handleItemClick)}>
			<Image
				src={objBadge.urlBadge}
				mode='aspectFit'
				className={
					`item-image ` + `${objBadge.time === '' ? 'item-gray ' : ''}`
				}
			/>
			<AtButton
				className='item-button'
				type='primary'
				size='small'
				onClick={useThrottle(handleItemClick)}
			>
				详情
			</AtButton>
		</View>
	)
}
