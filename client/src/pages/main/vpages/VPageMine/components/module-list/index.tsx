import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import memberInfoActions from '@/redux/actions/memberInfo'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'

import ModuleTitle from '@/components/module-title'

import './index.scss'

interface IModuleListProps {}

export default function ModuleList(props: IModuleListProps) {
	const {} = props

	const memberInfo = useSelector(state => state.memberInfo)

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 我的头像秀
	const handleAvatarShowClick = e => {
		console.log('handleAvatarShowClick', e)
		Taro.navigateTo({
			url: `/pages/avatar-show/index`,
		})
	}

	// 我的图片秀
	const handlePhotoShowClick = e => {
		console.log('handlePhotoShowClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	// 另类朋友圈
	const handleOtherMomentClick = e => {
		console.log('handleOtherMomentClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	// 我的接龙
	const handleActivityQueueClick = e => {
		console.log('handleActivityQueueClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	// 我的撩闲
	const handleOtherChatClick = e => {
		console.log('handleOtherChatClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	return (
		<View className='module-list-wrap'>
			<ModuleTitle strTitle='我的工具' />
			<AtList className='module-list-content'>
				<AtListItem
					className='item-normal'
					title='我的头像秀'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'lightsalmon',
						value: 'iconfont iconusercenter',
					}}
					onClick={useThrottle(handleAvatarShowClick)}
				/>
				{/* <AtListItem
					className='item-normal'
					title='我的图片秀'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'royalblue',
						value: 'iconfont icontupian',
					}}
					onClick={useThrottle(handlePhotoShowClick)}
				/> */}
				{/* <AtListItem
					className='item-normal'
					title='我的达人圈'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'violet',
						value: 'iconfont iconpengyouquan',
					}}
					onClick={useThrottle(handleOtherMomentClick)}
				/> */}
				{/* <AtListItem
					className='item-normal'
					title='我的接龙'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'yellowgreen',
						value: 'iconfont iconlianjieliu',
					}}
					onClick={useThrottle(handleActivityQueueClick)}
				/> */}
				{/* <AtListItem
					className='item-normal'
					title='我的撩闲'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'darkslateblue',
						value: 'iconfont iconliaotian',
					}}
					onClick={useThrottle(handleOtherChatClick)}
				/> */}
			</AtList>
		</View>
	)
}
