import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import webApi from '@/api'
import useQueryPageList from '@/hooks/useQueryPageList'
import { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import PageContent from '@/components/page-content'
import TabbarBottom from '@/components/tab-bar-bottom'

import VPageHome from './vpages/VPageHome/index'
import VPageDiscover from './vpages/VPageDiscover/index'
import VPageMine from './vpages/VPageMine/index'

import './index.scss'

export default function Main() {
	const {} = useRouter()

	const [strNavigationTitle, setNavigationTitle] = useState<string>('')
	const [arrBannerLocalList, setBannerLocalList] = useState<Array<any>>([])
	const [arrArticleList, setArticleList] = useState<Array<any>>([])
	const [showBottomLoadingTip, setBottomLoadingTip] = useState<boolean>(false)

	const {
		arrBannerList,
		strBottomBarListSelectCode,
		arrBottomBarList,
	} = useSelector(state => state.appInfo.objAppInfo)

	const onLoad = async () => {
		Taro.hideShareMenu()
		setBannerLocalList(arrBannerList)
		console.log('onLoad arrBannerList')
	}

	const processHomePageList = res => {
		const { state, list } = res
		switch (state) {
			case 'RESULT':
				setArticleList(list)
				setBottomLoadingTip(false)
				break
			case 'LOADING':
			case 'REACH_BOTTOM':
				setBottomLoadingTip(true)
				break
			default:
				break
		}
	}

	useEffect(() => {
		onLoad()
	}, [])

	// 监听底部导航数据变化
	useEffect(() => {
		const nIndex = arrBottomBarList.findIndex(item => {
			return item.code === strBottomBarListSelectCode
		})
		if (nIndex >= 0) {
			setNavigationTitle(arrBottomBarList[nIndex].title)
		}
	}, [arrBottomBarList, strBottomBarListSelectCode])

	useQueryPageList(
		{
			HOME: res => processHomePageList(res), // 首页
			DISCOVER: () => {},
			MINE: () => {},
		}[strBottomBarListSelectCode],
		{
			HOME: webApi.articleInfo.queryArticleList, // 首页
			DISCOVER: null,
			MINE: null,
		}[strBottomBarListSelectCode]
	)

	const handleButtonClick = () => {
		setArticleList([])
	}

	const renderVPage = () => {
		return {
			HOME: (
				<VPageHome
					arrBannerLocalList={arrBannerLocalList}
					arrArticleList={arrArticleList}
					showBottomLoadingTip={showBottomLoadingTip}
				/>
			),
			DISCOVER: <VPageDiscover />,
			MINE: <VPageMine />,
		}[strBottomBarListSelectCode]
	}

	return (
		<PageContent
			isShowLeftIcon={false}
			isTransparent
			colorBackgroud='transparent'
			strNavigationTitle={strNavigationTitle}
		>
			{/* 渲染对应内容 */}
			{renderVPage()}
			{/* 底部导航 */}
			<TabbarBottom />
		</PageContent>
	)
}
