import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter, useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import TabbarBottom from '@/components/TabBarBottom'

import VPageHome from './vpages/VPageHome/index'
import VPageDiscover from './vpages/VPageDiscover/index'
import VPageMine from './vpages/VPageMine/index'

import './index.scss'

export default function Main() {
	const {} = useRouter()

	const [strNavigationTitle, setNavigationTitle] = useState<string>('')

	const nSelectIndex = useSelector(
		state => state.appInfo.objBottomBarInfo.nSelectIndex
	)
	const arrBottomBarList = useSelector(
		state => state.appInfo.objBottomBarInfo.arrBottomBarList
	)

	const onShow = async () => {
		console.log('Main onShow.')
	}

	const onLoad = async () => {
		console.log('Main onLoad.')
	}

	// 监听nSelectIndex
	useEffect(() => {
		setNavigationTitle(arrBottomBarList[nSelectIndex].title)
	}, [nSelectIndex])

	useEffect(() => {
		onLoad()
	}, [])

	useDidShow(() => {
		onShow()
	})

	const renderVPage = () => {
		const code = arrBottomBarList[nSelectIndex].code
		switch (code) {
			case 'HOME': {
				return <VPageHome />
			}
			case 'DISCOVER': {
				return <VPageDiscover />
			}
			case 'MINE': {
				return <VPageMine />
			}
			default: {
				return <View>未知页面</View>
			}
		}
	}

	return (
		<View>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle={strNavigationTitle}
			/>
			{/* 渲染对应内容 */}
			{renderVPage()}
			{/* 底部导航 */}
			<TabbarBottom />
		</View>
	)
}
