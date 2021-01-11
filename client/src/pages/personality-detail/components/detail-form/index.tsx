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
			{/* 年限 */}
			{data.year && (
				<View className='flex-start-h form-item'>
					<View className='iconfont icongongzuonianxian'></View>
					{data.year}
				</View>
			)}
			{/* 性别 */}
			{data.sex && (
				<View className='flex-start-h form-item'>
					<View className='iconfont iconxingbienanxianxing'></View>
					{data.sex}
				</View>
			)}
			{/* 邮箱 */}
			{data.email && (
				<View className='flex-start-h form-item'>
					<View className='iconfont iconyoujian'></View>
					{data.email}
				</View>
			)}
			{/* 联系方式 */}
			{data.cellphone && (
				<View className='flex-start-h form-item'>
					<View className='iconfont icondianhua'></View>
					{data.cellphone}
				</View>
			)}
			{/* github */}
			{data.github && (
				<View className='flex-start-h form-item'>
					<View className='iconfont icongithub2'></View>
					{data.github}
				</View>
			)}
			{/* 网站 */}
			{data.website && (
				<View className='flex-start-h form-item'>
					<View className='iconfont iconwangzhan'></View>
					{data.website}
				</View>
			)}
			{/* 公众号 */}
			{data.official && (
				<View className='flex-start-h form-item'>
					<View className='iconfont icongongzhonghao'></View>
					{data.official}
				</View>
			)}
		</View>
	)
}
