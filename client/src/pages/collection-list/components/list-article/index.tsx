import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useThrottle from '@/hooks/useThrottle'

import { View } from '@tarojs/components'
import TipsPanel from '@/components/TipsPanel'

import './index.scss'

interface IListArticleProps {
	arrList: Array<any>
}

export default function ListArticle(props: IListArticleProps) {
	const { arrList = [] } = props

	const handleArticleDetailClick = item => {
		Taro.navigateTo({
			url: `/pages/article-detail/index` + `?articleId=${item._id}`,
		})
	}

	return (
		<View className='list-article-wrap'>
			{arrList && arrList.length > 0 ? (
				arrList.map((item, index) => {
					return (
						<View
							key={index}
							className='article-item-wrap'
							onClick={useThrottle(() => handleArticleDetailClick(item))}
						>
							<View>{item.title}</View>
							<View>{item.author}</View>
						</View>
					)
				})
			) : (
				<View className='list-empty flex-center'>
					<TipsPanel strType='EMPTY' />
				</View>
			)}
		</View>
	)
}
