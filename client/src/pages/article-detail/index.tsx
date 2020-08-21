import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { simpleDate } from '@/utils/index'

import { View, Block } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function ArticleDetail() {
	const {} = useRouter()

	const { nArticleCurrent, arrArticleList } = useSelector(
		state => state.articleInfo
	)

	const onLoad = () => {}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle={arrArticleList[nArticleCurrent].title}
			/>
			<View className='article-detail-wrap'>
				<View className='article-detail-item flex-center text-ellipsis article-author'>
					<View className='text-ellipsis'>
						作者：{arrArticleList[nArticleCurrent].author}
					</View>
				</View>
				<View className='article-detail-item flex-center text-ellipsis article-createDate'>
					<View className='text-ellipsis'>
						时间： {simpleDate(arrArticleList[nArticleCurrent].createDate)}
					</View>
				</View>
				<View>
					<poster
						style='overflow: hidden;'
						compress={3}
						html={arrArticleList[nArticleCurrent].content}
						lazy-load
						selectable
						show-with-animation
					/>
				</View>
			</View>
		</Block>
	)
}
