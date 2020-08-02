import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Taro, { useRouter, useDidShow } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import useActions from '@/hooks/useActions'
import NavigationHeader from '@/components/NavigationHeader'
// import VPageHome from './components/VPageHome/index'
// import VPageMine from './components/VPageMine/index'
// import VPageDiscover from './components/VPageDiscover/index'

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
		setNavigationTitle(arrBottomBarList[nSelectIndex].strName)
	}, [nSelectIndex])

	useEffect(() => {
		onLoad()
	}, [])

	useDidShow(() => {
		onShow()
	})

	// const renderVPage = () => {
	// 	switch (999) {
	// 		case 0: {
	// 			return <VPageHome />
	// 		}
	// 		case 1: {
	// 			return <VPageDiscover />
	// 		}
	// 		case 2: {
	// 			return <VPageMine />
	// 		}
	// 		default: {
	// 			return <View>未定义页面</View>
	// 		}
	// 	}
	// }

	return (
		<View>
			<NavigationHeader
				isShowLeftIcon
				isShowBorder={false}
				strNavigationTitle={strNavigationTitle}
			/>
			mnbtyfyt
			{/* 顶部导航 */}
			{/* 渲染对应内容 */}
			{/* {renderVPage()} */}
			{/* 底部导航 */}
		</View>
	)
}
