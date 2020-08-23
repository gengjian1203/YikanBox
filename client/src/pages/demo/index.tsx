import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import systemInfoActions from '@/redux/actions/systemInfo'

import webApi from '@/api/appInfo'
import AppService from '@/services/AppService'
import { router2url } from '@/utils/index'

import { Block } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function Demo() {
	const {
		params: { strTitle = '' },
	} = useRouter()

	const systemInfo = useSelector(state => state.systemInfo)

	const { setSystemInfo } = useActions(systemInfoActions)

	const onLoad = () => {
		console.log('Demo onload')
		Taro.hideShareMenu()
	}

	const onUnload = () => {
		console.log('Demo Unload')
	}

	useEffect(() => {
		onLoad()
		return () => {
			onUnload()
		}
	}, [])
	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle={strTitle} />
		</Block>
	)
}
