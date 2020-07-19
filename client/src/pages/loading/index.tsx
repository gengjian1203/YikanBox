import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import appInfoActions from '@/redux/actions/appInfo'
import useActions from '@/hooks/useActions'

import './index.scss'

export default function Loading() {
	const {} = useRouter()
	const { appInfo } = useSelector(state => state)
	const { setBottomBarSelect } = useActions(appInfoActions)

	const onShow = async () => {}

	const onLoad = async () => {
		console.log('Loading onload1.', appInfo)
		setBottomBarSelect(9527)
		console.log('Loading onload2.', appInfo)
		Taro.reLaunch({
			url: '/pages/main/index',
		})
		return () => {}
	}

	useEffect(() => {
		onLoad()
	}, [])

	useDidShow(() => {
		onShow()
	})

	return <View>么么么么么么</View>
}
