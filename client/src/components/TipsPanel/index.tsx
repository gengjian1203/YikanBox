import React from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IComLoadingProps {
	strType: 'LOADING' | 'EMPTY'
}

export default function TipsPanel(props: IComLoadingProps) {
	const { strType } = props

	const readerPanel = () => {
		switch (strType) {
			case 'LOADING':
				return (
					<View className='loading-wrap flex-center-h'>
						<View className='loading-item'></View>
						<View className='loading-item'></View>
						<View className='loading-item'></View>
						<View className='loading-item'></View>
						<View className='loading-item'></View>
					</View>
				)
			case 'EMPTY':
				return (
					<View className='empty-wrap flex-center-v'>
						{/* <Image mode='widthFix' src='/images/empty.jpg' /> */}
						<View className='empty-item-text'>暂无内容呦~</View>
					</View>
				)
			default:
				return <View></View>
		}
	}
	return readerPanel()
}