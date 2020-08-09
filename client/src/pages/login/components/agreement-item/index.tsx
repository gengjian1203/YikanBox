import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'

interface IItemContentProps {
	strContent?: string
}

export default function ItemContent(props: IItemContentProps) {
	const { strContent = '' } = props

	return (
		<View className='item-content-wrap'>
			<Text className='item-content-text' space='nbsp'>{strContent}</Text>
		</View>
	)
}
