import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import { View, Button } from '@tarojs/components'

import webApi from '@/api/memberInfo'
import { checkObjectEmpty } from '@/utils/index'

import './index.scss'

interface IVPageMineProps {}

export default function VPageMine(props: IVPageMineProps) {
	const {} = props

	const memberInfo = useSelector(state => state.memberInfo)

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {
		console.log('VPageMine')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleGetUserInfo = async e => {
		console.log('handleGetUserInfo', e)
		// if (!checkObjectEmpty(memberInfo)) {
		// 	return
		// }
		const objUserInfo = e.detail.userInfo
		if (objUserInfo && !checkObjectEmpty(objUserInfo)) {
			const res = await webApi.addMemberInfo(objUserInfo)
			setMemberInfo(res.data)
		}
	}

	return (
		<View className='vpage-mine-wrap'>
			我的页面
			<Button openType='getUserInfo' onGetUserInfo={handleGetUserInfo}>
				点击
			</Button>
		</View>
	)
}
