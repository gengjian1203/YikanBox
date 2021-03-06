import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

interface IDetailFormParam {
	data?: any
}

export default function DetailForm(props: IDetailFormParam) {
	const { data } = props

	const arrEnableType = ['cellphone']

	const handleFormItemClick = item => {
		// console.log('handleFormItemClick', item)
		switch (item.type) {
			case 'cellphone':
				Taro.makePhoneCall({
					phoneNumber: item.value,
				})
				break
			default:
				break
		}
	}

	return (
		<View className='flex-center-v detail-form-wrap'>
			{data.map((item, index) => (
				<View
					className='flex-start-h form-item'
					key={index}
					onClick={() => handleFormItemClick(item)}
				>
					<View className='flex-center-h item-icon'>
						<View className={`iconfont ${item.icon}`}></View>
					</View>
					{item.name && (
						<View className='text-nowrap item-name '>{item.name}：</View>
					)}
					<View
						className={
							`text-nowrap ` +
							`item-value ` +
							`${arrEnableType.includes(item.type) ? 'item-enable ' : ''}`
						}
					>
						{item.value}
					</View>
				</View>
			))}
		</View>
	)
}
