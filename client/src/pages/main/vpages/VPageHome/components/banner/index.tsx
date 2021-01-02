import Taro from '@tarojs/taro'
import React from 'react'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.scss'

interface IBannerItemType {
	strImageId: string
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
							onClick={useThrottle(
								useCheckLogin(() => handleBannerClick(item))
							)}
						>
							<Image
								className='banner-image'
								src={item.strImageUrl || item.strImageId}
								mode='aspectFit'
							/>
						</View>
					</SwiperItem>
				)
			})}
		</Swiper>
	)
}
