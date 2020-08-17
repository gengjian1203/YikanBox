import Taro from '@tarojs/taro'
import React from 'react'

import { Block, View, Image } from '@tarojs/components'

import './index.scss'

interface IArticleType {
	_id?: string
	title?: string // 标题
	author?: string // 作者
	content?: string // 内容HTML
	createDate?: string // 创建时间
	href?: string // Url
	posterImg?: string // 截图Url
}

interface IModuleArticleProps {
	objArticleData?: IArticleType
}

export default function ModuleArticle(props: IModuleArticleProps) {
	const { objArticleData = {} } = props

	const handleArticleDetailClick = () => {
		Taro.navigateTo({
			url: `/pages/article-detail/index`,
		})
	}

	return (
		<View className='article-wrap' onClick={handleArticleDetailClick}>
			<View className='article-item flex-center text-ellipsis article-title'>
				{objArticleData.title}
			</View>
			<View className='article-item flex-center text-ellipsis article-author'>
				{objArticleData.author}
			</View>
			<View className='article-item flex-center text-ellipsis article-createDate'>
				{objArticleData.createDate}
			</View>
			<Image
				className='article-image'
				mode='widthFix'
				src={`${objArticleData.posterImg}`}
			/>
		</View>
	)
}
