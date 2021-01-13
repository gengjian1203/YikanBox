import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IDetailIcontextParam {
	data?: any
}

export default function DetailIcontext(props: IDetailIcontextParam) {
	const { data } = props

	return (
		<View className='detail-icontext-wrap'>
			<View className='item-left'>
				<View className='flex-center-h item-icon'>
					<View className={`iconfont ${data.icon}`}></View>
				</View>
			</View>
			<View className='flex-center-v item-right'>
				<View className='text-justify item-title'>{data.title}</View>
				{data.content.map((item, index) => (
					<View className='text-justify item-content' key={index}>
						{item}
					</View>
				))}
			</View>
		</View>
	)
}
