import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import { View } from '@tarojs/components'

import './index.scss'

interface IVPageHomeProps {}

export default function VPageHome(props: IVPageHomeProps) {
	const {} = props

	const appInfo = useSelector(state => state.appInfo)

	const { setBottomBarSelect } = useActions(appInfoActions)

	const onLoad = async () => {
		console.log('VPageHome')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<View className='vpage-home-wrap'>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
		</View>
	)
}
