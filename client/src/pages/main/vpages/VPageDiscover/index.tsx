import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import { View } from '@tarojs/components'

import './index.scss'

interface IVPageDiscoverProps {}

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const {} = props

	const appInfo = useSelector(state => state.appInfo)

	const { setBottomBarSelect } = useActions(appInfoActions)

	const onLoad = async () => {
		console.log('VPageDiscover')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return <View className='vpage-discover-wrap'>发现页面</View>
}
