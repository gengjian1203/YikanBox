import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import memberInfoActions from '@/redux/actions/memberInfo'

import { View } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

interface IModuleBadgeProps {
	isStateMyself: boolean // 是否为自己
	memberInfo: any // 用户信息
}

export default function ModuleBadge(props: IModuleBadgeProps) {
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
		<View className='module-badge-wrap'>
			<ModuleTitle strTitle='拥有徽章' />
		</View>
	)
}
