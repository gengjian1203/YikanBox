import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import memberInfoActions from '@/redux/actions/memberInfo'
import systemInfoActions from '@/redux/actions/systemInfo'
import shareInfoActions from '@/redux/actions/shareInfo'
import articleInfoActions from '@/redux/actions/articleInfo'
import { SIZE_PAGE_DISCOVER } from '@/redux/constants/articleInfo'

import webApi from '@/api'
import AppService from '@/services/AppService'
import StorageManager from '@/services/StorageManager'
import { router2param } from '@/utils/index'

import { View } from '@tarojs/components'
import PageContent from '@/components/page-content'
import PanelTips from '@/components/panel-tips'

import { changeQRCodeParam } from './utils/index'

import './index.scss'

const m_objAppService = AppService.getInstance()
const m_managerStorage = StorageManager.getInstance()

export default function Loading() {
	const { params } = useRouter()

	const [isBlackMember, setBlackMember] = useState<boolean>(false)

	const {
		setAppInfo,
		setIsIOS,
		setIsIphoneX,
		setHeightNavigation,
		setHeightNavigationHeader,
		setHeightTabbar,
		setHeightTabbarBottom,
		setBottomBarSelect,
	} = useActions(appInfoActions)
	const { setMemberInfo } = useActions(memberInfoActions)
	const { setSystemInfo } = useActions(systemInfoActions)
	const { setShareInfo } = useActions(shareInfoActions)
	const { setArticleList } = useActions(articleInfoActions)

	// 校验该用户是否为黑名单用户
	const checkIsBlackMember = (appInfo, strMemberId) => {
		// console.log('checkIsBlackMember', strMemberId)
		// console.log('checkIsBlackMember', appInfo.arrBlackList)
		const nIndex = appInfo.arrBlackList.findIndex(item => {
			return item === strMemberId
		})
		m_managerStorage.setStorageSync('isBlackMember', nIndex >= 0)
	}

	// 查询小程序信息以及用户信息
	const queryLoginInfo: any = async () => {
		const res = await webApi.appInfo.queryLoginInfo()
		// console.log('queryLoginInfo', res)
		return res
			? {
					strMemberId: res.strMemberId,
					appInfo: res.appInfo.data[0],
					memberInfo: res.memberInfo.data,
			  }
			: null
	}

	// 初始化Api基本信息
	const initApi = async () => {
		m_objAppService.init()
		// console.log('initApi done.')
	}

	// 初始化系统级信息
	const initSystemInfo = async () => {
		Taro.getSystemInfo({
			success: res => {
				// console.log('AppInitDataService getSystemInfo', res)
				const isIOS = res.system.includes('iOS')
				const isIphoneX =
					res.model.includes('iPhone X') || res.model.includes('iPhone12')
				setSystemInfo(res)
				setIsIOS(isIOS)
				setIsIphoneX(isIphoneX)
				setHeightNavigation(40)
				setHeightNavigationHeader(40 + res.statusBarHeight)
				setHeightTabbar(60)
				setHeightTabbarBottom(60 + (isIphoneX ? 34 : 0))
			},
			fail: err => {
				// console.error('AppInitDataService getSystemInfo', err)
				setSystemInfo(err)
				setIsIOS(false)
				setIsIphoneX(false)
				setHeightNavigation(40)
				setHeightNavigationHeader(40 + 20)
				setHeightTabbar(60)
				setHeightTabbarBottom(60)
			},
		})
		// console.log('initSystemInfo done.')
	}

	// 初始化应用级信息
	const initLoginInfo = async () => {
		// 配置小程序级别变量
		const loginInfo = await queryLoginInfo()
		if (loginInfo) {
			const { strMemberId, appInfo, memberInfo } = loginInfo
			let strBottomBarListSelectIdTmp = '000000'
			try {
				for (let item of appInfo.arrBottomBarList) {
					if (item.enable) {
						strBottomBarListSelectIdTmp = item.id
						break
					}
				}
			} catch (e) {
				console.error('initLoginInfo strBottomBarListSelectIdTmp', e)
			}

			checkIsBlackMember(appInfo, strMemberId)
			setAppInfo(appInfo)
			setBottomBarSelect(strBottomBarListSelectIdTmp)
			setMemberInfo(memberInfo)
			// console.log('initLoginInfo done.')
		}
		return loginInfo
	}

	// 跳转页面逻辑
	const jumpPage = async objLoginInfo => {
		const appInfo = objLoginInfo.appInfo
		if (params.scene) {
			// 分享二维码进入的
			const paramQueryQRCode = {
				strQRCodeId: params.scene,
			}
			const res = await webApi.qrcodeInfo.queryQRCode(paramQueryQRCode)
			// console.log('Loading jumpPage', res)
			const paramResult = changeQRCodeParam(router2param(res.data.strSharePath))
			const shareInfoTmp = {
				...paramResult,
				sharePath: decodeURIComponent(paramResult.sharePath),
			}
			setShareInfo(shareInfoTmp)
			Taro.reLaunch({
				url: shareInfoTmp.sharePath,
			})
		} else if (params.sharePath) {
			// 分享进入的
			const shareInfoTmp = {
				...params,
				sharePath: decodeURIComponent(params.sharePath),
			}
			setShareInfo(shareInfoTmp)

			// console.log('Loading jumpPage', shareInfoTmp)
			Taro.reLaunch({
				url: shareInfoTmp.sharePath,
			})
		} else {
			Taro.reLaunch({
				url: appInfo.strMainPath,
			})
		}
	}

	// 预加载文章列表
	const prevLoadingArticleList = async () => {
		const objParams = {
			nPageNum: 0,
			nPageSize: SIZE_PAGE_DISCOVER,
		}
		const res = await webApi.articleInfo.queryArticleList(objParams)
		setArticleList(res ? res.data : [])
		// console.log('prevLoadingData done.')
	}

	const onLoad = async () => {
		Taro.hideShareMenu()

		const [
			resInitApi,
			resInitSystemInfo,
			resInitLoginInfo,
		] = await Promise.all([initApi(), initSystemInfo(), initLoginInfo()])

		// 异步预加载文章数据
		prevLoadingArticleList()

		console.log(
			'Loading onLoad',
			params,
			resInitApi,
			resInitSystemInfo,
			resInitLoginInfo
		)
		const isBlackMemberTmp = m_managerStorage.getStorageSync('isBlackMember')
		setBlackMember(isBlackMemberTmp)

		if (!isBlackMemberTmp) {
			jumpPage(resInitLoginInfo)
		}
	}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<PageContent
			isShowLeftIcon={false}
			customClass='loading-page-wrap flex-center-v'
		>
			{isBlackMember ? (
				<Fragment>
					<View className='loading-page-text flex-center-v'>
						您的帐号由于违规操作而被封，
					</View>
					<View className='loading-page-text flex-center-v'>
						目前无权限进行该操作。
					</View>
				</Fragment>
			) : (
				<Fragment>
					<PanelTips strType='LOADING' />
				</Fragment>
			)}
		</PageContent>
	)
}
