import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import React, { useEffect } from 'react'
import appInfoActions from '@/redux/actions/appInfo'
import useActions from '@/hooks/useActions'

import webApi from '@/api/appInfo'
import AppService from '@/services/AppService'
import { router2url } from '@/utils/index'

import { View } from '@tarojs/components'

import './index.scss'

const m_objAppService = AppService.getInstance()

export default function Loading() {
	const {
		params: { strSharePath = '', objShareParams = {} },
	} = useRouter()
	const { setMainPath, setBottomBarList, setBottomBarSelect } = useActions(
		appInfoActions
	)

	const queryAppInfo = async () => {
		const res = await webApi.queryAppInfo()
		console.log('queryAppInfo', res)
	}

	const onShow = async () => {}

	const onLoad = async () => {
		m_objAppService.init()
		// 配置小程序级别变量
		const appInfo = await queryAppInfo()
		const strMainPath = '/pages/main/index'
		setBottomBarList(['11', '22', '33'])
		setMainPath(strMainPath)
		setBottomBarSelect(0)
		// 分享进入的
		if (strSharePath) {
			setBottomBarSelect(0)
			Taro.reLaunch({
				url: router2url(strSharePath, objShareParams),
			})
		} else {
			Taro.reLaunch({
				url: strMainPath,
			})
		}

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
