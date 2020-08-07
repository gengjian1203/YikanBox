import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import React, { useEffect } from 'react'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import memberInfoActions from '@/redux/actions/memberInfo'
import systemInfoActions from '@/redux/actions/systemInfo'

import webApi from '@/api/loginInfo'
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
	const { setMemberInfo } = useActions(memberInfoActions)
	const { setSystemInfo } = useActions(systemInfoActions)

	const queryLoginInfo: any = async () => {
		const res = await webApi.queryLoginInfo()
		console.log('queryLoginInfo', res)
		return {
			appInfo: res.appInfo.data[0],
			memberInfo: res.memberInfo.data,
		}
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
	const initLoginInfo = async () => {
		// 配置小程序级别变量
		const loginInfo = await queryLoginInfo()
		const appInfo = loginInfo.appInfo
		const memberInfo = loginInfo.memberInfo
		const strMainPath = appInfo.strMainPath

		setBottomBarSelect(appInfo.nBottomBarListSelect)
		setBottomBarList(appInfo.arrBottomBarList)
		setMainPath(strMainPath)
		setMemberInfo(memberInfo)

		return loginInfo
	}

	// 跳转页面逻辑
	const jumpPage = async objLoginInfo => {
		const appInfo = objLoginInfo.appInfo
		// 分享进入的
		if (strSharePath) {
			setBottomBarSelect(0)
			Taro.reLaunch({
				url: router2url(strSharePath, objShareParams),
			})
		} else {
			Taro.reLaunch({
				url: appInfo.strMainPath,
			})
		}
	}

	const onLoad = async () => {
		await initApi()
		await initSystemInfo()
		const objLoginInfo = await initLoginInfo()

		jumpPage(objLoginInfo)
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
