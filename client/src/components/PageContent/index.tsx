import Taro from '@tarojs/taro'
import React from 'react'
import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

interface IPageContentParam {
	customClass?: string
	customStyle?: string
	isShowLeftIcon?: boolean // 顶部导航：是否展示左上角按钮
	isTransparent?: boolean // 顶部导航：是否是透明导航样式
	strNavigationTitle?: string // 顶部导航：导航名称
	colorBackgroud?: string // 顶部导航：背景颜色
	colorTitle?: string // 顶部导航：文本颜色
	children?: any
}

export default function PageContent(props: IPageContentParam) {
	const {
		customClass = '',
		customStyle = '',
		isShowLeftIcon = true,
		isTransparent = false,
		strNavigationTitle = '',
		colorBackgroud = '#ffffff',
		colorTitle = '#000000',
		children,
	} = props

	const colorPrimary = ''

	// 样式规范
	const themeStyle = `--color-primary: ${
		colorPrimary ? colorPrimary : '#f7b500'
	}; `

	return (
		<View
			className={`page-content-wrap ${customClass}`}
			style={`${themeStyle} ${customStyle}`}
		>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon={isShowLeftIcon}
				isTransparent={isTransparent}
				strNavigationTitle={strNavigationTitle}
				colorBackgroud={colorBackgroud}
				colorTitle={colorTitle}
			/>
			{/* 渲染对应内容 */}
			{children}
		</View>
	)
}
