import React from 'react'
import { View, Image } from '@tarojs/components'
import * as imagesLocal from '@/services/ResourceImage'

import './index.scss'

interface IPanelTipsProps {
	strType: 'LOADING' | 'EMPTY'
}

export default function PanelTips(props: IPanelTipsProps) {
	const { strType } = props

	const readerPanel = () => {
		switch (strType) {
			case 'LOADING':
				return (
					<View className='loading-wrap flex-center-h'>
						<Image
							className='loading-content'
							src={imagesLocal.strUrlImageLoading}
							mode='widthFix'
						/>
					</View>
				)
			case 'EMPTY':
				return (
					<View className='empty-wrap flex-center-v'>
						<Image
							className='empty-image'
							mode='widthFix'
							src={imagesLocal.strUrlImageCommonEmpty}
						/>
						{/* <View className='empty-item-text'>暂无内容呦~</View> */}
					</View>
				)
			default:
				return <View></View>
		}
	}

	return readerPanel()
}
