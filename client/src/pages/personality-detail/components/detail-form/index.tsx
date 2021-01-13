import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

interface IDetailFormParam {
	data?: any
}

export default function DetailForm(props: IDetailFormParam) {
	const { data } = props

	return (
		<View className='flex-center-v detail-form-wrap'>
			{data.map((item, index) => (
				<View className='flex-start-h form-item' key={index}>
					<View className='flex-center-h item-icon'>
						<View className={`iconfont ${item.icon}`}></View>
					</View>
					{item.value}
				</View>
			))}
		</View>
	)
}
