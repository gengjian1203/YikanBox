import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import webApi from '@/api/articleInfo'
import { simpleDate } from '@/utils/index'

import { AtButton } from 'taro-ui'
import { View, Block } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function ArticleDetail() {
	const {
		path,
		params: { articleId = '', from = '' },
	} = useRouter()

	const [isCollectionSelect, setCollectionSelect] = useState<boolean>(false)
	const [objArticleInfo, setArticleInfo] = useState<any>({})

	const memberInfo = useSelector(state => state.memberInfo)
	const { nArticleCurrent, arrArticleList } = useSelector(
		state => state.articleInfo
	)

	useShareAppMessage(res => {
		const sharePath = encodeURIComponent(
			`/pages/article-detail/index` + `?from=share` + `&articleId=${articleId}`
		)
		const pathTmp = `/pages/loading/index?sharePath=` + sharePath

		console.log('useShareAppMessage', pathTmp)
		return {
			title: '',
			imageUrl: '',
			path: pathTmp,
		}
	})

	useEffect(() => {
		console.log('ArticleDetail... ', memberInfo.data_arrArticleCollectionList)
		if (memberInfo.data_arrArticleCollectionList) {
			// 查找该文章是否被收藏
		} else {
			setCollectionSelect(false)
		}
	}, [memberInfo.data_arrArticleCollectionList])

	const onLoad = async () => {
		console.log('onLoad... ', from)
		// 直接进来不用调取接口，分享进来的需要调取接口
		if (from === 'share') {
			const objParams = {
				articleId: articleId,
			}
			const res = await webApi.queryArticleInfo(objParams)
			console.log('onLoad... ', res)
			setArticleInfo(res.data)
		} else {
			setArticleInfo(arrArticleList[nArticleCurrent])
		}
	}

	useEffect(() => {
		onLoad()
	}, [])

	const handleCollectionClick = () => {
		console.log('handleCollectionClick')
		setCollectionSelect(prev => !prev)
	}

	const handleShareClick = () => {
		console.log('handleShareClick')
	}

	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle={objArticleInfo.title}
			/>
			<View className='article-detail-wrap'>
				{/* 作者 */}
				<View className='article-detail-item flex-center text-ellipsis article-author'>
					<View className='text-ellipsis'>作者：{objArticleInfo.author}</View>
				</View>
				{/* 时间 */}
				<View className='article-detail-item flex-center text-ellipsis article-createDate'>
					<View className='text-ellipsis'>
						时间： {simpleDate(objArticleInfo.createDate)}
					</View>
				</View>
				{/* 富文本翻译 */}
				<poster
					style='overflow: hidden;'
					compress={3}
					html={objArticleInfo.content}
					lazy-load
					selectable
					show-with-animation
				/>
				{/* 浮动区域 */}
				<View className='article-float flex-center-v'>
					{/* 点赞 */}
					<AtButton className='float-btn-icon' onClick={handleCollectionClick}>
						<View className={`iconfont ` + `icon-collection `}>
							<View
								className={
									`iconfont ` +
									`icon-collection-select ` +
									`${
										isCollectionSelect
											? 'fade-in-from-scale'
											: 'fade-out-from-scale'
									}`
								}
							></View>
						</View>
					</AtButton>
					{/* 分享 */}
					<AtButton
						className='float-btn-icon'
						openType='share'
						onClick={handleShareClick}
					>
						<View className='iconfont icon-share'></View>
					</AtButton>
				</View>
			</View>
		</Block>
	)
}
