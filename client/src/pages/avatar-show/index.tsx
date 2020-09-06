import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useThrottle from '@/hooks/useThrottle'

import { shareType, processSharePath, getHDAvatarUrl } from '@/utils/index'

import { View, Image } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import ButtonBottom from '@/components/ButtonBottom'

import './index.scss'

export default function AvatarShow() {
	const { path } = useRouter()

	const store = useSelector(state => state)
	const memberInfo = useSelector(state => state.memberInfo)

	useShareAppMessage(res => {
		const sharePath = processSharePath(
			{
				sharePath: path,
				shareType: shareType.PATH_ARTICLE,
			},
			store
		)
		console.log('useShareAppMessage', sharePath)
		return {
			title: '看我做了一个头像秀，并@了你',
			imageUrl: '',
			path: sharePath,
		}
	})

	const onLoad = () => {
		console.log('AvatarShow onload')
	}

	useEffect(() => {
		onLoad()
	}, [])

	const handleButtonSaveClick = () => {
		console.log('handleButtonSaveClick')
		Taro.navigateBack()
	}

	return (
		<View className='avatar-show-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的头像秀' />
			{/* 头像主页面 */}
			<View className='avatar-show-content'>
				<Image
					className='avatar-show-image'
					mode='widthFix'
					src={getHDAvatarUrl(memberInfo.user_avatarUrl)}
				/>
			</View>
			{/* 饰品操作栏 */}
			<View className='avatar-show-jewelry'></View>
			{/* 底部按钮 */}
			<ButtonBottom fixed title='保存' onButtonClick={handleButtonSaveClick} />
		</View>
	)
}
