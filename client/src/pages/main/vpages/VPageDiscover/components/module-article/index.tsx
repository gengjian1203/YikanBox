import Taro from '@tarojs/taro'
import React from 'react'

import { Block, View } from '@tarojs/components'

import './index.scss'
interface IModuleArticleProps {
	objArticleData?: any
}

export default function ModuleArticle(props: IModuleArticleProps) {
	const { objArticleData = {} } = props

	return (
		<Block>
			<View className='article-title'>{objArticleData.title}</View>
			<poster html={objArticleData.content} />
		</Block>
	)
}
