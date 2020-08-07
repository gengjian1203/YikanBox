import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'

import { View, Block } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import './index.scss'

interface ITabbarBottomProps {}

export default function TabBarBottom(props: ITabbarBottomProps) {
	const {} = props

	const objBottomBarInfo = useSelector(state => state.appInfo.objBottomBarInfo)

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
				onClick={handleTabbarSelect}
			/>
			{/* 文档流占位 */}
			<Block>
				<View style={`height: ${Taro.pxTransform(120)}`}></View>
				<View className='safe-bottom'></View>
			</Block>
		</Block>
	)
}
