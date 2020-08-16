import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Block, View, Swiper, SwiperItem } from '@tarojs/components'

import ModuleArticle from '../module-article'

import './index.scss'

interface IModuleSwiperProps {
	arrArticleList?: Array<any>
}

export default function ModuleSwiper(props: IModuleSwiperProps) {
	const { arrArticleList = [] } = props

	const { nHeightNavigationHeader, nHeightTabbarBottom } = useSelector(
		state => state.appInfo.objAppHeight
	)

	const handleSwiperChange = e => {
		console.log('handleSwiperChange', e)
	}

	return (
		<Block>
			{arrArticleList.length ? (
				<Swiper
					className='module-swiper-wrap'
					style={`height: calc(100vh - ${Taro.pxTransform(
						(nHeightNavigationHeader + nHeightTabbarBottom) * 2
					)}); `}
					vertical
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
					style={`height: calc(100vh - ${Taro.pxTransform(
						(nHeightNavigationHeader + nHeightTabbarBottom) * 2
					)}); `}
				>
					暂无内容呦
				</View>
			)}
		</Block>
	)
}
