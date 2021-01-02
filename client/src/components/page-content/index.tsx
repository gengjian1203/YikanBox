import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import TabbarBottom from '@/components/TabBarBottom'

import './index.less'

interface IPageContentParam {
	children?: any
}

export default function PageContent(props: IPageContentParam) {
	const { children } = props

	const [strNavigationTitle, setNavigationTitle] = useState<string>('')

	const strBottomBarListSelectCode = useSelector(
		state => state.appInfo.objAppInfo.strBottomBarListSelectCode
	)
	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)

	// 监听底部导航数据变化
	useEffect(() => {
		const nIndex = arrBottomBarList.findIndex(item => {
			return item.code === strBottomBarListSelectCode
		})
		if (nIndex >= 0) {
			setNavigationTitle(arrBottomBarList[nIndex].title)
		}
	}, [arrBottomBarList, strBottomBarListSelectCode])

	return (
		<View className='page-content-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon={false}
				isTransparent
				colorBackgroud='transparent'
				strNavigationTitle={strNavigationTitle}
			/>
			{/* 渲染对应内容 */}
			{children}

			{/* 底部导航 */}
			<TabbarBottom />
		</View>
	)
}
