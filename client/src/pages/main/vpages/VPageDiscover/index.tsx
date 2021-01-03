import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import articleInfoActions from '@/redux/actions/articleInfo'
import { SIZE_PAGE_DISCOVER } from '@/redux/constants/articleInfo'
import webApi from '@/api'

import { View, Swiper, SwiperItem } from '@tarojs/components'
import PanelTips from '@/components/PanelTips'

import ModuleArticle from './components/module-article'

import './index.scss'

interface IVPageDiscoverProps {
	customWrapClass?: string
	customWrapStyle?: string
}

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const { customWrapClass = '', customWrapStyle = '' } = props

	const { nHeightNavigationHeader, nHeightTabbarBottom } = useSelector(
		state => state.appInfo.objAppHeight
	)
	const { nArticleCurrent, arrArticleList } = useSelector(
		state => state.articleInfo
	)
	const { setArticleCurrent, updateArticleListSplice } = useActions(
		articleInfoActions
	)

	const onLoad = async () => {
		console.log('VPageDiscover')
		if (arrArticleList.length === 0) {
			const objParams = {
				nPageNum: 0,
				nPageSize: SIZE_PAGE_DISCOVER,
			}
			const res = await webApi.articleInfo.queryArticleList(objParams)
			updateArticleListSplice({
				nPageNum: 0,
				arrDataList: res.data,
			})
		}
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 切换 swiper
	const handleSwiperChange = async e => {
		// console.log('handleSwiperChange', e)
		const nCurrent = e.detail.current
		setArticleCurrent(nCurrent)
		// 判断是否需要加载后续数据
		const nLength = arrArticleList.length
		const nPageNum = Math.floor(nCurrent / SIZE_PAGE_DISCOVER) + 1
		if (nCurrent === nLength - 5) {
			const objParams = {
				nPageNum: nPageNum,
				nPageSize: SIZE_PAGE_DISCOVER,
			}
			const res = await webApi.articleInfo.queryArticleList(objParams)
			updateArticleListSplice({
				nPageNum,
				arrDataList: res.data,
			})
		}
	}

	return (
		<View
			className={`vpage-discover-wrap ${customWrapClass}`}
			style={customWrapStyle}
		>
			{arrArticleList.length ? (
				<Swiper
					className='module-swiper-wrap'
					style={`height: calc(100vh - ${Taro.pxTransform(
						nHeightTabbarBottom * 2
					)}); `}
					vertical
					current={nArticleCurrent}
					onChange={handleSwiperChange}
				>
					{arrArticleList.map((item, index) => (
						<SwiperItem key={index} className='swiper-item flex-center'>
							{/* 文章简介模块 */}
							{index <= nArticleCurrent + 1 && index >= nArticleCurrent - 1 && (
								<ModuleArticle objArticleData={item} />
							)}
						</SwiperItem>
					))}
				</Swiper>
			) : (
				<View
					className='module-swiper-wrap flex-center'
					style={`height: calc(100vh - ${Taro.pxTransform(
						(nHeightNavigationHeader + nHeightTabbarBottom) * 2
					)}); `}
				>
					<PanelTips strType='EMPTY' />
				</View>
			)}
		</View>
	)
}
