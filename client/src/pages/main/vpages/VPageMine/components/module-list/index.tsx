import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import memberInfoActions from '@/redux/actions/memberInfo'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'

import ModuleTitle from '@/components/ModuleTitle'

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
	}

	// 我的图片秀
	const handlePhotoShowClick = e => {
		console.log('handlePhotoShowClick', e)
	}

	// 我的接龙
	const handleActivityQueueClick = e => {
		console.log('handleActivityQueueClick', e)
	}

	// 另类朋友圈
	const handleOtherMomentClick = e => {
		console.log('handleOtherMomentClick', e)
	}

	// 退出登录
	const handleLogoutClick = e => {
		console.log('handleLogoutClick', e)
		Taro.showModal({
			title: '提示',
			content: '是否要退出登录',
			success: res => {
				if (res.confirm) {
					setMemberInfo({})
				}
			},
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
					iconInfo={{ size: 25, color: 'red', value: 'iconfont icon-mine' }}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的图片秀'
					arrow='right'
					iconInfo={{ size: 25, color: 'red', value: 'iconfont icon-mine' }}
					onClick={useThrottle(useCheckLogin(handlePhotoShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的接龙'
					arrow='right'
					iconInfo={{ size: 25, color: 'red', value: 'iconfont icon-mine' }}
					onClick={useThrottle(useCheckLogin(handleActivityQueueClick))}
				/>

				<AtListItem
					className='item-normal'
					title='另类朋友圈'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'green',
						value: 'iconfont icon-calender',
					}}
					onClick={useThrottle(useCheckLogin(handleOtherMomentClick))}
				/>
				{memberInfo._id && (
					<AtListItem
						className='item-logout'
						title='退出登录'
						onClick={handleLogoutClick}
					/>
				)}
			</AtList>
		</View>
	)
}
