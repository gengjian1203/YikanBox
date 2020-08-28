import React from 'react'
import { Text } from '@tarojs/components'

import './index.scss'

interface ITagProps {
	strName?: string // 内容文字
	strColor?: string // 文字颜色
	strBKColor?: string // 标签背景色
	customWrapClass?: string // 自定义底框样式
}

export default function Tag(props: ITagProps) {
	const {
		strName = '',
		strColor = '#ffffff',
		strBKColor = '#b2b2b2',
		customWrapClass = '',
	} = props

	return (
		<Text
			className={`tag-wrap flex-center ${customWrapClass}`}
			style={`background-color: ${strBKColor}; ` + `color: ${strColor}; `}
		>
			{strName}
		</Text>
	)
}
