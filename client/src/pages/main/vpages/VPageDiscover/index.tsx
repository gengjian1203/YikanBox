import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import articleInfoActions from '@/redux/actions/articleInfo'
import webApi from '@/api/articleInfo'

import { View, Swiper, SwiperItem } from '@tarojs/components'

import ModuleArticle from './components/module-article'

import './index.scss'

interface IVPageDiscoverProps {}

const PAGE_SIZE = 100

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const {} = props

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false)

	const { nHeightNavigationHeader, nHeightTabbarBottom } = useSelector(
		state => state.appInfo.objAppHeight
	)
	const { nArticleCurrent, arrArticleList } = useSelector(
		state => state.articleInfo
	)
	const { setArticleCurrent, setArticleList } = useActions(articleInfoActions)

	const onLoad = async () => {
		console.log('VPageDiscover')
		if (arrArticleList.length === 0) {
			const objParams = {
				nPageNum: 0,
				nPageSize: PAGE_SIZE,
			}
			const res = await webApi.queryArticleInfo(objParams)
			console.log('VPageDiscover onLoad', res)
			setArticleList(res.data)
		}
		setLoadComplete(true)
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 切换 swiper
	const handleSwiperChange = e => {
		console.log('handleSwiperChange', e)
		setArticleCurrent(e.detail.current)
	}

	return (
		<View className='vpage-discover-wrap'>
			{isLoadComplete ? (
				arrArticleList.length ? (
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
							<SwiperItem key={index} className='swiper-item'>
								<ModuleArticle objArticleData={item} />
							</SwiperItem>
						))}
					</Swiper>
				) : (
					<View
						className='module-swiper-wrap'
						style={`height: calc(100vh - ${Taro.pxTransform(
							(nHeightNavigationHeader + nHeightTabbarBottom) * 2
						)}); `}
					>
						暂无内容呦
					</View>
				)
			) : (
				<View>加载中...</View>
			)}
		</View>
	)
}
