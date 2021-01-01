import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from '@tarojs/taro'
import { Block, View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import TabbarBottom from '@/components/TabBarBottom'

import VPageHome from './vpages/VPageHome/index'
import VPageDiscover from './vpages/VPageDiscover/index'
import VPageMine from './vpages/VPageMine/index'

import './index.scss'

export default function Main() {
	const {} = useRouter()

	const [strNavigationTitle, setNavigationTitle] = useState<string>('')

	const strBottomBarListSelectCode = useSelector(
		state => state.appInfo.objAppInfo.strBottomBarListSelectCode
	)
	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)

	const onLoad = async () => {
		// console.log('Main onLoad.')
		Taro.hideShareMenu()
	}

	// 监听底部导航数据变化
	useEffect(() => {
		const nIndex = arrBottomBarList.findIndex(item => {
			return item.code === strBottomBarListSelectCode
		})
		if (nIndex >= 0) {
			setNavigationTitle(arrBottomBarList[nIndex].title)
		}
	}, [arrBottomBarList, strBottomBarListSelectCode])

	useEffect(() => {
		onLoad()
	}, [])

	const renderVPage = () => {
		return (
			<Fragment>
				<VPageHome
					customWrapStyle={
						strBottomBarListSelectCode === 'HOME' ? '' : 'display: none; '
					}
				/>
				<VPageDiscover
					customWrapStyle={
						strBottomBarListSelectCode === 'DISCOVER' ? '' : 'display: none; '
					}
				/>
				<VPageMine
					customWrapStyle={
						strBottomBarListSelectCode === 'MINE' ? '' : 'display: none; '
					}
				/>
			</Fragment>
		)
	}

	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon={false}
				isTransparent
				colorBackgroud='transparent'
				strNavigationTitle={strNavigationTitle}
			/>
			{/* 渲染对应内容 */}
			{renderVPage()}

			{/* 底部导航 */}
			<TabbarBottom />
		</Block>
	)
}
