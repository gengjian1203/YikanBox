import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import webApiArticleInfo from '@/api/articleInfo'
import webApiMemberInfo from '@/api/memberInfo'
import { processSharePath } from '@/utils/index'

import { AtButton } from 'taro-ui'
import { View, Block } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import { checkCollectionArticle } from './utils/index'

import './index.scss'

export default function ArticleDetail() {
	const {
		path,
		params: { articleId = '', from = '' },
	} = useRouter()

	const [isCollectionSelect, setCollectionSelect] = useState<boolean>(false)
	const [objArticleInfo, setArticleInfo] = useState<any>({})

	const store = useSelector(state => state)
	const memberInfo = useSelector(state => state.memberInfo)
	const { arrArticleList } = useSelector(state => state.articleInfo)

	const { addCollectionArticleInfo, removeCollectionArticleInfo } = useActions(
		memberInfoActions
	)

	useShareAppMessage(res => {
		const sharePath = processSharePath(
			{
				sharePath: path,
				articleId: articleId,
			},
			store
		)
		console.log('useShareAppMessage', sharePath)
		return {
			title: '',
			imageUrl: '',
			path: sharePath,
		}
	})

	useEffect(() => {
		console.log(
			'Watch.',
			memberInfo.data_arrCollectionArticleList,
			objArticleInfo
		)
		setCollectionSelect(
			checkCollectionArticle(
				memberInfo.data_arrCollectionArticleList,
				objArticleInfo
			)
		)
	}, [memberInfo.data_arrCollectionArticleList, objArticleInfo])

	const onLoad = async () => {
		console.log('onLoad... ', from, articleId)
		// 直接进来不用调取接口，分享进来的需要调取接口
		if (from === 'share') {
			const objParams = {
				articleId: articleId,
			}
			const res = await webApiArticleInfo.queryArticleInfo(objParams)
			setArticleInfo(res.data)
		} else {
			const nIndex = arrArticleList.findIndex(item => {
				return articleId === item._id
			})
			if (nIndex >= 0) {
				setArticleInfo(arrArticleList[nIndex])
			} else {
				const objParams = {
					articleId: articleId,
				}
				const res = await webApiArticleInfo.queryArticleInfo(objParams)
				setArticleInfo(res.data)
			}
		}
	}

	useEffect(() => {
		onLoad()
	}, [])

	const handleCollectionClick = async () => {
		console.log('handleCollectionClick', objArticleInfo)
		const isCollectionSelectTmp = !isCollectionSelect
		setCollectionSelect(isCollectionSelectTmp)

		if (isCollectionSelectTmp) {
			const res = await webApiMemberInfo.addCollectionArticle(objArticleInfo)
			console.log('addCollectionArticle', res.data)
			addCollectionArticleInfo(res.data)
		} else {
			const res = await webApiMemberInfo.removeCollectionArticle(objArticleInfo)
			console.log('removeCollectionArticle', res)
			removeCollectionArticleInfo(objArticleInfo)
		}
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
				<View className='article-detail-item flex-center text-ellipsis article-createTime'>
					<View className='text-ellipsis'>
						收录时间： {objArticleInfo.createTime}
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
					<AtButton
						className='float-btn-icon'
						onClick={useThrottle(useCheckLogin(handleCollectionClick))}
					>
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
						onClick={useThrottle(handleShareClick)}
					>
						<View className='iconfont icon-share'></View>
					</AtButton>
				</View>
			</View>
		</Block>
	)
}
