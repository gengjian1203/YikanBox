import Taro from '@tarojs/taro'
import React from 'react'
import useThrottle from '@/hooks/useThrottle'
import { getArticleTagName } from '@/utils/index'

import { View, Image, Text } from '@tarojs/components'
import Tag from '@/components/Tag'

import './index.scss'

interface IArticleType {
	_id?: string
	title?: string // 标题
	author?: string // 作者
	content?: string // 内容HTML
	createDate?: string // 创建时间
	createTime?: string // 创建时间
	href?: string // Url
	posterImg?: string // 截图Url
	source?: string // 爬取源类型
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
			<View className='article-item'>
				<Tag
					customWrapClass='item-tag'
					strName={getArticleTagName(objArticleData.source)}
					strColor='#ffffff'
					strBKColor='#0084ff'
				/>
				<Text className='article-title text-ellipsis'>
					{objArticleData.title}
				</Text>
			</View>
			<View className='article-item'>
				<Text className='article-value text-ellipsis'>
					作者：{objArticleData.author}
				</Text>
			</View>
			<View className='article-item'>
				<Text className='article-value text-ellipsis'>
					收录时间：{objArticleData.createTime}
				</Text>
			</View>
			<Image
				className='article-image'
				mode='widthFix'
				src={`${objArticleData.posterImg}`}
			/>
		</View>
	)
}
