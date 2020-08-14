import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import './index.scss'

interface INavigationProps {
	isShowLeftIcon?: boolean
	strNavigationTitle?: string
}

export default function Navigation(props: INavigationProps) {
	const { isShowLeftIcon = false, strNavigationTitle = '' } = props

	const [strLeftIcon, setLeftIcon] = useState<string>('')
	const [objPageInfo, setPageInfo] = useState<any>({})

	const appInfo = useSelector(state => state.appInfo)

	const onLoad = async () => {
		const objPageInfo = Taro.getCurrentPages() // 路由信息
		if (isShowLeftIcon) {
			if (objPageInfo.length === 1) {
				// 首页
				setLeftIcon('left-icon iconfont icon-nav-home')
			} else {
				// 返回
				setLeftIcon('left-icon iconfont icon-nav-back')
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
		<View className='navigation-wrap'>
			<View className='navigation-left' onClick={handleLeftIconClick}>
				<View className={strLeftIcon}></View>
			</View>
			<View className='navigation-mid'>
				<View className='mid-title'>{strNavigationTitle}</View>
			</View>
			<View className='navigation-right'></View>
		</View>
	)
}