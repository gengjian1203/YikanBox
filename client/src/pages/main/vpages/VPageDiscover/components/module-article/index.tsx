import Taro from '@tarojs/taro'
import React from 'react'
import useThrottle from '@/hooks/useThrottle'

import { simpleDate } from '@/utils/index'

import { View, Image } from '@tarojs/components'

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
			url: `/pages/article-detail/index` + `?articleId=${objArticleData._id}`,
		})
	}

	return (
		<View
			className='article-wrap'
			onClick={useThrottle(handleArticleDetailClick)}
		>
			<View className='article-item flex-center article-title'>
				<View className='text-ellipsis'>{objArticleData.title}</View>
			</View>
			<View className='article-item flex-center article-author'>
				<View className='text-ellipsis'>作者：{objArticleData.author}</View>
			</View>
			<View className='article-item flex-center article-createDate'>
				<View className='text-ellipsis'>
					时间：{simpleDate(objArticleData.createDate)}
				</View>
			</View>
			<Image
				className='article-image'
				mode='widthFix'
				src={`${objArticleData.posterImg}`}
			/>
		</View>
	)
}
