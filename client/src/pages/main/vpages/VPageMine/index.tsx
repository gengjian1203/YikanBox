import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import { View } from '@tarojs/components'

import './index.scss'

interface IVPageMineProps {}

export default function VPageMine(props: IVPageMineProps) {
	const {} = props

	const memberInfo = useSelector(state => state.memberInfo)

	const onLoad = async () => {
		console.log('VPageMine')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return <View className='vpage-mine-wrap'>我的页面</View>
}
