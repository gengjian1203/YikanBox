import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import React, { useEffect } from 'react'
import appInfoActions from '@/redux/actions/appInfo'
import systemInfoActions from '@/redux/actions/systemInfo'
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
	const { setSystemInfo } = useActions(systemInfoActions)

	const queryAppInfo: any = async () => {
		const params = {
			type: 'QUERY',
		}
		const res = await webApi.queryAppInfo(params)
		console.log('queryAppInfo', res)
		return res
	}

	// 初始化Api基本信息
	const initApi = async () => {
		m_objAppService.init()
	}

	// 初始化系统级信息
	const initSystemInfo = async () => {
		Taro.getSystemInfo({
			success: res => {
				console.log('AppInitDataService getSystemInfo', res)
				setSystemInfo(res)
			},
			fail: err => {
				console.error('AppInitDataService getSystemInfo', err)
				setSystemInfo(err)
			},
		})
	}

	// 初始化应用级信息
	const initAppInfo = async () => {
		// 配置小程序级别变量
		const appInfo = await queryAppInfo()
		const strMainPath = appInfo.strMainPath
		setBottomBarSelect(appInfo.nBottomBarListSelect)
		setBottomBarList(appInfo.arrBottomBarList)
		setMainPath(strMainPath)
		return appInfo
	}

	// 跳转页面逻辑
	const jumpPage = async objAppInfo => {
		// 分享进入的
		if (strSharePath) {
			setBottomBarSelect(0)
			Taro.reLaunch({
				url: router2url(strSharePath, objShareParams),
			})
		} else {
			Taro.reLaunch({
				url: objAppInfo.strMainPath,
			})
		}
	}

	const onLoad = async () => {
		await initApi()
		await initSystemInfo()
		const objAppInfo = await initAppInfo()

		jumpPage(objAppInfo)
		return () => {}
	}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<View className='loading-page-wrap'>
			<View>Loading...</View>
		</View>
	)
}
