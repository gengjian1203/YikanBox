import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import memberInfoActions from '@/redux/actions/memberInfo'
import { hiddenString, simpleDate } from '@/utils/index'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

interface IModuleBaseProps {
	isStateMyself: boolean // 是否为自己
	memberInfo: any // 用户信息
}

export default function ModuleBase(props: IModuleBaseProps) {
	const { memberInfo = {} } = props

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 我的头像秀
	const handleAvatarShowClick = e => {
		console.log('handleAvatarShowClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	return (
		<View className='module-base-wrap'>
			<ModuleTitle strTitle='基本信息' />
			<AtList className='base-list'>
				<AtListItem
					className='item-normal'
					title='我的昵称'
					extraText={memberInfo.user_nickName}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的ID'
					extraText={hiddenString(memberInfo._id)}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的等级'
					extraText={`Lv.${memberInfo.data_level}`}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的称号'
					extraText='初出茅庐'
					arrow='right'
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='我的头像框'
					extraText='新人之星'
					arrow='right'
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title='注册时间'
					extraText={simpleDate(memberInfo.app_createDate)}
				/>
			</AtList>
		</View>
	)
}
