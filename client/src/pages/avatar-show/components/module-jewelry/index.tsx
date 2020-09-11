import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import systemInfoActions from '@/redux/actions/systemInfo'

import { View, ScrollView } from '@tarojs/components'

import { arrJewelryList } from '../../utils/const'

import './index.scss'

interface IModuleJewelryProps {
	content?: string
}

export default function ModuleJewelry(props: IModuleJewelryProps) {
	const {} = props

	// 点击饰品
	const handleJewelryItemClick = item => {
		console.log('handleJewelryItemClick', item)
		// setImageText(item.name)
	}

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
