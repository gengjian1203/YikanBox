import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import webApi from '@/api'
import { shareType, processSharePath, getArticleTagName } from '@/utils/index'
import ResourceManager from '@/services/ResourceManager'

import { AtButton } from 'taro-ui'
import { Block, View, Text } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import PanelShare from '@/components/PanelShare'
import Tag from '@/components/Tag'

import { checkCollectionArticle } from './utils/index'

import './index.scss'

export default function ArticleDetail() {
	const {
		path,
		params: { articleId = '', from = '' },
	} = useRouter()

	const [isCollectionSelect, setCollectionSelect] = useState<boolean>(false) // 是否已收藏
	const [isShowPanelShare, setShowPanelShare] = useState<boolean>(false) // 是否展示分享面板
	const [strContentUrl, setContentUrl] = useState<string>('')
	const [objArticleInfo, setArticleInfo] = useState<any>({})

	const memberInfo = useSelector(state => state.memberInfo)
	const { arrArticleList } = useSelector(state => state.articleInfo)

	const { addCollectionArticleInfo, removeCollectionArticleInfo } = useActions(
		memberInfoActions
	)

	useEffect(() => {
		// console.log(
		// 	'Watch.',
		// 	memberInfo.data_arrCollectionArticleList,
		// 	objArticleInfo
		// )
		setCollectionSelect(
			checkCollectionArticle(
				memberInfo.data_arrCollectionArticleList,
				objArticleInfo
			)
		)
	}, [memberInfo.data_arrCollectionArticleList, objArticleInfo])

	const onLoad = async () => {
		// console.log('onLoad... ', from, articleId)
		let objArticleInfoTmp = {}
		// 直接进来不用调取接口，分享进来的需要调取接口
		if (from === 'share') {
			const objParams = {
				articleId: articleId,
			}
			const res = await webApi.articleInfo.queryArticleInfo(objParams)
			objArticleInfoTmp = res.data
		} else {
			const nIndex = arrArticleList.findIndex(item => {
				return articleId === item._id
			})
			if (nIndex >= 0) {
				objArticleInfoTmp = arrArticleList[nIndex]
			} else {
				const objParams = {
					articleId: articleId,
				}
				const res = await webApi.articleInfo.queryArticleInfo(objParams)
				objArticleInfoTmp = res.data
			}
		}
		setArticleInfo(objArticleInfoTmp)
	}

	useEffect(() => {
		onLoad()
	}, [])

	// 点击收藏
	const handleCollectionClick = async () => {
		// console.log('handleCollectionClick', objArticleInfo)
		const isCollectionSelectTmp = !isCollectionSelect
		setCollectionSelect(isCollectionSelectTmp)

		if (isCollectionSelectTmp) {
			const res = await webApi.memberInfo.addCollectionArticle(objArticleInfo)
			// console.log('addCollectionArticle', res.data)
			addCollectionArticleInfo(res.data)
		} else {
			const res = await webApi.memberInfo.removeCollectionArticle(
				objArticleInfo
			)
			// console.log('removeCollectionArticle', res)
			removeCollectionArticleInfo(objArticleInfo)
		}
	}

	// 点击分享
	const handleShareClick = async () => {
		setContentUrl(await ResourceManager.getUrl(objArticleInfo.posterImg))
		setShowPanelShare(true)
	}

	// 分享弹窗反馈
	const handleShowPanelShare = isShow => {
		setShowPanelShare(isShow)
	}

	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='文章详情' />
			<View className='article-detail-wrap'>
				{/* 标题 */}
				<View className='article-detail-item'>
					<Tag
						customWrapClass='item-tag'
						strName={getArticleTagName(objArticleInfo.source)}
						strColor='#ffffff'
						strBKColor='#0084ff'
					/>
					<Text className='item-title'>{objArticleInfo.title}</Text>
				</View>
				{/* 作者 */}
				<View className='article-detail-item'>
					<Text className='item-value text-ellipsis'>
						作者：{objArticleInfo.author}
					</Text>
				</View>
				{/* 时间 */}
				<View className='article-detail-item'>
					<Text className='item-value text-ellipsis'>
						时间：{objArticleInfo.createTime}
					</Text>
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
						onClick={useThrottle(useCheckLogin(handleShareClick))}
					>
						<View className='iconfont icon-share'></View>
					</AtButton>
				</View>

				{/* 分享面板 */}
				<PanelShare
					isShowPanelShare={isShowPanelShare}
					strShareTitle='分享了一篇文章，并@了你'
					strShareImage={objArticleInfo.posterImg}
					strSharePath={processSharePath({
						sharePath: path,
						shareType: shareType.PATH_ARTICLE,
						articleId: articleId,
					})}
					strContentUrl={strContentUrl}
					onShowPanelShare={handleShowPanelShare}
				/>
			</View>
		</Block>
	)
}
