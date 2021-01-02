import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'

import { View } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'

import useSmartClick from './hooks/useSmartClick'

import './index.scss'

interface ITabbarBottomProps {}

export default function TabBarBottom(props: ITabbarBottomProps) {
	const {} = props

	const [nTabBarBottomCurrent, setTabBarBottomCurrent] = useState<number>(0)
	const [arrTabBarBottomList, setTabBarBottomList] = useState<Array<any>>([])

	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)
	const strBottomBarListSelectCode = useSelector(
		state => state.appInfo.objAppInfo.strBottomBarListSelectCode
	)
	const nHeightTabbar = useSelector(
		state => state.appInfo.objAppHeight.nHeightTabbar
	)

	const { setBottomBarSelect } = useActions(appInfoActions)

	useEffect(() => {
		const arrTabBarBottomListTmp = arrBottomBarList.filter(item => {
			return item.enable === true
		})
		setTabBarBottomList(arrTabBarBottomListTmp)
		const nIndex = arrTabBarBottomListTmp.findIndex(item => {
			return item.code === strBottomBarListSelectCode
		})
		setTabBarBottomCurrent(nIndex)
	}, [arrBottomBarList, strBottomBarListSelectCode])

	const handleTabbarSelect = value => {
		setBottomBarSelect(arrTabBarBottomList[value].code)
	}

	return (
		<Fragment>
			<AtTabBar
				fixed
				tabList={arrTabBarBottomList}
				current={nTabBarBottomCurrent}
				onClick={useSmartClick(handleTabbarSelect)}
			/>
			{/* 文档流占位 */}
			<Fragment>
				<View style={`height: ${Taro.pxTransform(nHeightTabbar * 2)}`}></View>
				<View className='safe-bottom'></View>
			</Fragment>
		</Fragment>
	)
}
