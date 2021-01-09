import React, { useState, useEffect } from 'react'
import { ScrollView, Swiper, SwiperItem, View } from '@tarojs/components'
import './index.less'

interface IDetailContentParam {
	arrSwiperList: Array<any>
	nCurrentDetail: number
	onDetailChange: (e) => void
}

export default function DetailContent(props: IDetailContentParam) {
	const { arrSwiperList = [], nCurrentDetail = 0, onDetailChange } = props

	const handleDetailChange = e => {
		// console.log('handleDetailChange', e)
		onDetailChange(e.detail.current)
	}

	return (
		<Swiper
			className='detail-content-wrap'
			indicatorColor='var(--color-shadow)'
			indicatorActiveColor='var(--color-primary)'
			current={nCurrentDetail}
			circular
			indicatorDots
			onChange={handleDetailChange}
		>
			{arrSwiperList.map((item, index) => (
				<SwiperItem key={index}>
					<ScrollView
						className='detail-content-item'
						scrollY
						scrollWithAnimation
					>
						{item}
					</ScrollView>
				</SwiperItem>
			))}
		</Swiper>
	)
}
