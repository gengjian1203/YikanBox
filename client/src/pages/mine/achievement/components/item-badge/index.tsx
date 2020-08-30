import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

interface IBadgeInfoType {
	code?: string
	url?: string
	name?: string
	describe?: string
	time?: string
}

interface IModuleBadgeProps {
	objBadge: Array<IBadgeInfoType>
	onItemClick: any
	onItemButtonClick: any
}

export default function ModuleBadge(props: IModuleBadgeProps) {
	const {
		objBadge = {},
		onItemClick = () => true,
		onItemButtonClick = () => true,
	} = props

	// 点击徽章
	const handleItemClick = e => {
		console.log('handleItemClick', e)
		e.stopPropagation()
		onItemClick(objBadge)
	}

	// 点击按钮
	const handleItemButtonClick = e => {
		console.log('handleButtonClick', e)
		e.stopPropagation()
		onItemButtonClick(objBadge)
	}

	return (
		<View className='badge-item-wrap' onClick={useThrottle(handleItemClick)}>
			<Image
				src={objBadge.url}
				mode='aspectFit'
				className={
					`badge-item ` + `${objBadge.time === '' ? 'item-gray ' : ''}`
				}
			/>
			<AtButton
				className='badge-button'
				type='primary'
				size='small'
				onClick={useThrottle(handleItemButtonClick)}
			>
				详情
			</AtButton>
		</View>
	)
}
