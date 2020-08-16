import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'

import { View, Block } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import useSmartClick from './hooks/useSmartClick'

import './index.scss'

interface ITabbarBottomProps {}

export default function TabBarBottom(props: ITabbarBottomProps) {
	const {} = props

	const objBottomBarInfo = useSelector(state => state.appInfo.objBottomBarInfo)
	const nHeightTabbar = useSelector(
		state => state.appInfo.objAppHeight.nHeightTabbar
	)

	const { setBottomBarSelect } = useActions(appInfoActions)

	const handleTabbarSelect = value => {
		setBottomBarSelect(value)
	}

	return (
		<Block>
			<AtTabBar
				fixed
				tabList={objBottomBarInfo.arrBottomBarList}
				current={objBottomBarInfo.nSelectIndex}
				onClick={useSmartClick(handleTabbarSelect)}
			/>
			{/* 文档流占位 */}
			<Block>
				<View style={`height: ${Taro.pxTransform(nHeightTabbar * 2)}`}></View>
				<View className='safe-bottom'></View>
			</Block>
		</Block>
	)
}
