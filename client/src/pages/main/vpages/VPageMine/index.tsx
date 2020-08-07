import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import { View, Button } from '@tarojs/components'

import webApi from '@/api/memberInfo'
import { checkObjectEmpty } from '@/utils/index'

import './index.scss'

interface IVPageMineProps {}

export default function VPageMine(props: IVPageMineProps) {
	const {} = props

	const appInfo = useSelector(state => state.appInfo)

	const { setBottomBarSelect } = useActions(appInfoActions)

	const onLoad = async () => {
		console.log('VPageMine')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleGetUserInfo = async e => {
		console.log('handleGetUserInfo', e)
		const objUserInfo = e.detail.userInfo
		if (objUserInfo && !checkObjectEmpty(objUserInfo)) {
			const res = await webApi.addMemberInfo(objUserInfo)
			console.log(handleGetUserInfo, res)
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
