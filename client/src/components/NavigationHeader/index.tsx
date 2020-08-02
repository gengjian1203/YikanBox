import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'

import './index.scss'

interface INavigationHeaderProps {
	isShowLeftIcon?: boolean // 是否展示左上角按钮
	isShowBorder?: boolean // 是否有分割线
	strNavigationTitle?: string // 导航名称
}

const nAtNavBarHeight = 43 // AtNavBar导航栏高度

export default function NavigationHeader(props: INavigationHeaderProps) {
	const {
		isShowLeftIcon = true,
		isShowBorder = false,
		strNavigationTitle = '',
	} = props

	const [strIcon, setIcon] = useState<string>('')
	const [objPageInfo, setPageInfo] = useState<any>({})

	const appInfo = useSelector(state => state.appInfo)
	const objSystemInfo = useSelector(state => state.systemInfo)

	const onLoad = async () => {
		const objPageInfo = Taro.getCurrentPages() // 路由信息
		if (isShowLeftIcon) {
			if (objPageInfo.length === 1) {
				// 首页
				setIcon('iconfont icon-nav-home')
			} else {
				// 返回
				setIcon('iconfont icon-nav-back')
			}
		}
		setPageInfo(objPageInfo)
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleLeftIconClick = e => {
		if (!isShowLeftIcon) {
			return
		}
		if (objPageInfo.length === 1) {
			// 首页
			Taro.reLaunch({
				url: appInfo.strMainPath,
			})
		} else {
			// 返回
			Taro.navigateBack()
		}
	}

	return (
		<View className='navigation-header-wrap'>
			{/* 绝对定位浮于页面顶部 */}
			<View className='navigation-header-content'>
				<View style={`height: ${objSystemInfo.statusBarHeight}px;`}></View>
				<AtNavBar
					border={isShowBorder}
					title={strNavigationTitle}
					leftIconType={strIcon}
					onClickLeftIcon={handleLeftIconClick}
				/>
			</View>
			{/* 占位 */}
			<View
				style={`height: ${objSystemInfo.statusBarHeight + nAtNavBarHeight}px;`}
			></View>
		</View>
	)
}
