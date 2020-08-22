import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import articleInfoActions from '@/redux/actions/articleInfo'
import { SIZE_PAGE_DISCOVER } from '@/redux/constants/articleInfo'
import webApi from '@/api/articleInfo'

import { View, Swiper, SwiperItem } from '@tarojs/components'
import TipsPanel from '@/components/TipsPanel'

import ModuleArticle from './components/module-article'

import './index.scss'

interface IVPageDiscoverProps {}

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const {} = props

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
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 切换 swiper
	const handleSwiperChange = async e => {
		console.log('handleSwiperChange', e)
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
			const res = await webApi.queryArticleList(objParams)
			updateArticleListSplice({
				nPageNum,
				arrDataList: res.data,
			})
		}
	}

	return (
		<View className='vpage-discover-wrap'>
			{arrArticleList.length ? (
				<Swiper
					className='module-swiper-wrap'
					style={`height: calc(100vh - ${Taro.pxTransform(
						(nHeightNavigationHeader + nHeightTabbarBottom) * 2
					)}); `}
					vertical
					current={nArticleCurrent}
					onChange={handleSwiperChange}
				>
					{arrArticleList.map((item, index) => (
						<SwiperItem key={index} className='swiper-item flex-center'>
							<ModuleArticle objArticleData={item} />
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
					<TipsPanel strType='EMPTY' />
				</View>
			)}
		</View>
	)
}
