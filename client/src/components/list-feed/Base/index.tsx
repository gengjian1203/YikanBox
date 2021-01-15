import React from 'react'
import { View, Image } from '@tarojs/components'
import { IItemType } from '../index'

import './index.scss'

interface IBaseProps {
	arrList: Array<IItemType>
	onDetailClick: (any: any) => void
}

export default function Base(props: IBaseProps) {
	const { arrList = [], onDetailClick } = props

	const handleDetailClick = item => {
		onDetailClick(item)
	}

	return (
		<View className='base-wrap'>
			{arrList.map((item, index) => {
				return (
					<View
						key={index}
						className='base-item border-bottom-line'
						onClick={() => handleDetailClick(item)}
					>
						{item.title && <View className='item-content'>{item.title}</View>}
					</View>
				)
			})}
		</View>
	)
}
