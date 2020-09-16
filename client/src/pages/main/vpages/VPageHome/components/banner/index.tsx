import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

interface IBannerItemType {
	strImageUrl: string
	strNavUrl?: string
}

interface IBannerProps {
	arrBannerList?: Array<IBannerItemType>
}

export default function Banner(props: IBannerProps) {
	const { arrBannerList = [] } = props

	const handleBannerClick = item => {
		console.log('handleBannerClick', item)
		if (!item.strNavUrl) {
			return
		}
		Taro.navigateTo({
			url: item.strNavUrl,
		})
	}

	return (
		<Swiper
			className='banner-wrap'
			indicatorColor='#999'
			indicatorActiveColor='#333'
			circular
			indicatorDots
			autoplay
		>
			{arrBannerList.map((item, index) => {
				return (
					<SwiperItem key={index}>
						<View
							className='banner-item flex-center'
							onClick={() => handleBannerClick(item)}
						>
							{/* <View>====|||{item.strImageUrl}</View>
							<View>====|||{item.strNavUrl}</View> */}
							<Image
								className='banner-image'
								src={item.strImageUrl}
								mode='aspectFit'
							/>
						</View>
					</SwiperItem>
				)
			})}
		</Swiper>
	)
}
