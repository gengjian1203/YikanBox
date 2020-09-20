import Taro, { usePageScroll } from '@tarojs/taro'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { View } from '@tarojs/components'
import Navigation from '@/components/Navigation'

import './index.scss'

interface INavigationHeaderProps {
	isShowLeftIcon?: boolean // 是否展示左上角按钮
	isTransparent?: boolean // 是否是透明导航样式
	strNavigationTitle?: string // 导航名称
	colorBackgroud?: string // 背景颜色
	colorTitle?: string // 文本颜色
}

const nNavPadding = 200 // Navigation填补空白高度
const nProtectHeight = 60 // 保护区域
const nOpacityFadeOutFinish = 160 // 淡出区域
const nOpacityFadeInFinish = 260 // 淡入区域

export default function NavigationHeader(props: INavigationHeaderProps) {
	const {
		isShowLeftIcon = true,
		isTransparent = false,
		strNavigationTitle = '',
		colorBackgroud = '#ffffff',
		colorTitle = '#000000',
	} = props

	const [nOpacityTransparent, setOpacityTransparent] = useState<number>(1)
	const [nOpacityColor, setOpacityColor] = useState<number>(0)

	const systemInfo = useSelector(state => state.systemInfo)
	const nHeightNavigationHeader = useSelector(
		state => state.appInfo.objAppHeight.nHeightNavigationHeader
	)

	usePageScroll(res => {
		if (isTransparent) {
			const nScrollTop = res.scrollTop

			if (nScrollTop < nProtectHeight) {
				// 位移低于保护区域：透明导航-展示、实体导航-不展示
				if (nOpacityTransparent !== 1) {
					setOpacityTransparent(1)
				}
				if (nOpacityColor !== 0) {
					setOpacityColor(0)
				}
			} else if (
				nScrollTop >= nProtectHeight &&
				nScrollTop < nOpacityFadeOutFinish
			) {
				// 位移在保护区域与淡出区域之间：透明导航-渐渐消失、实体导航-不展示
				const fOpacity =
					1 -
					(nScrollTop - nProtectHeight) /
						(nOpacityFadeOutFinish - nProtectHeight)
				setOpacityTransparent(fOpacity)
				setOpacityColor(0)
			} else if (
				nScrollTop >= nOpacityFadeOutFinish &&
				nScrollTop < nOpacityFadeInFinish
			) {
				// 位移在淡出区域与淡入区域之间：透明导航-不展示、实体导航-渐渐浮现
				const fOpacity =
					(nScrollTop - nOpacityFadeOutFinish) /
					(nOpacityFadeInFinish - nOpacityFadeOutFinish)
				setOpacityTransparent(0)
				setOpacityColor(fOpacity)
			} else {
				// 位移在淡入区域之外：透明导航-不展示、实体导航-展示
				if (nOpacityTransparent !== 0) {
					setOpacityTransparent(0)
				}
				if (nOpacityColor !== 1) {
					setOpacityColor(1)
				}
			}
		}
	})

	// useEffect(() => {
	// 	console.log(
	// 		'nOpacityTransparent',
	// 		nOpacityTransparent,
	// 		'nOpacityColor',
	// 		nOpacityColor
	// 	)
	// 	return () => {}
	// }, [nOpacityColor, nOpacityTransparent])

	return (
		<View className='navigation-header-wrap'>
			{/* 透明底色导航实现模块 */}
			{isTransparent && (
				<View
					className='navigation-header bk-transparent'
					style={
						`top: ${Taro.pxTransform(
							(systemInfo.statusBarHeight - nNavPadding) * 2
						)}; ` + `opacity: ${nOpacityTransparent}; `
					}
				>
					<Navigation
						isShowLeftIcon={isShowLeftIcon}
						colorBackgroud={colorBackgroud}
						colorTitle={colorTitle}
					/>
				</View>
			)}
			{/* 实体底色导航实现模块 */}
			<View
				className='navigation-header bk-color'
				style={
					`top: ${Taro.pxTransform(
						(systemInfo.statusBarHeight - nNavPadding) * 2
					)}; ` + `opacity: ${isTransparent ? nOpacityColor : 1}; `
				}
			>
				<Navigation
					isShowLeftIcon={isShowLeftIcon}
					strNavigationTitle={strNavigationTitle}
					colorBackgroud={colorBackgroud}
					colorTitle={colorTitle}
				/>
			</View>
			{/* 下拉占位展示区 */}
			{!isTransparent && (
				<View
					style={`height: ${Taro.pxTransform(nHeightNavigationHeader * 2)}; `}
				></View>
			)}
		</View>
	)
}
