import React from 'react'
import { View, Image } from '@tarojs/components'
import { IItemType } from '../index'

import './index.scss'

interface IMomentsProps {
	arrList: Array<IItemType>
	onDetailClick: (any: any) => void
}

export default function Moments(props: IMomentsProps) {
	const { arrList = [], onDetailClick } = props

	const handleDetailClick = item => {
		onDetailClick(item)
	}

	return (
		<View className='moments-wrap'>
			{arrList.map((item, index) => {
				return (
					<View
						key={index}
						className='moments-item border-bottom-line'
						onClick={() => handleDetailClick(item)}
					>
						<View className='item-left'>
							<Image
								className='item-logo'
								src={item.posterImg || ''} //{item.logo || ''}
								mode='widthFix'
							></Image>
						</View>
						<View className='item-right flex-center-v'>
							<View className='item-author text-ellipsis'>{item.author}</View>
							{item.title && <View className='item-content'>{item.title}</View>}
							{item.images?.length && (
								<View className='item-media'>多媒体区域</View>
							)}
							{item.address && (
								<View className='item-adress'>{item.address}</View>
							)}
							<View className='item-bottom flex-between-h'>
								<View className='item-time'>{item.createTime}</View>
								{/* <View className='item-options flex-center iconfont icon19'></View> */}
							</View>
						</View>
					</View>
				)
			})}
		</View>
	)
}
