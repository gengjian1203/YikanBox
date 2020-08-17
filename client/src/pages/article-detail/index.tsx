import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

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
				<View className='article-detail-item flex-center text-ellipsis'>
					{arrArticleList[nArticleCurrent].author}
				</View>
				<View className='article-detail-item flex-center text-ellipsis'>
					{arrArticleList[nArticleCurrent].createDate}
				</View>

				<poster html={arrArticleList[nArticleCurrent].content} />
			</View>
		</Block>
	)
}
