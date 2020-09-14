import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

interface IBannerProps {
	arrBannerList?: Array<any>
}

export default function Banner(props: IBannerProps) {
	const { arrBannerList = [] } = props

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
						<View className='banner-item flex-center'>
							<Image className='banner-image' src={item.url} mode='aspectFit' />
						</View>
					</SwiperItem>
				)
			})}
		</Swiper>
	)
}
