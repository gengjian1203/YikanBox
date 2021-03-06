import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import PanelBottom from '@/components/panel-bottom'

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
	const strBottomBarListSelectId = useSelector(
		state => state.appInfo.objAppInfo.strBottomBarListSelectId
	)
	const nHeightTabbar = useSelector(
		state => state.appInfo.objAppHeight.nHeightTabbar
	)

	const objIconType = {
		HOME: {
			iconType: 'iconhome',
			selectedIconType: 'iconhome-fill',
		},
		DISCOVER: {
			iconType: 'iconfaxian',
			selectedIconType: 'iconfaxian1',
		},
		MINE: {
			iconType: 'iconbussiness-man',
			selectedIconType: 'iconbussiness-man-fill',
		},
	}

	const { setBottomBarSelect } = useActions(appInfoActions)

	useEffect(() => {
		const arrTabBarBottomListTmp = arrBottomBarList
			.filter(item => {
				return item.enable === true
			})
			.map(item => {
				return {
					...item,
					iconType: `iconfont ` + `${objIconType[item.code]?.iconType} `,
					selectedIconType:
						`iconfont ` + `${objIconType[item.code]?.selectedIconType} `,
				}
			})
		setTabBarBottomList(arrTabBarBottomListTmp)
		const nIndex = arrTabBarBottomListTmp.findIndex(item => {
			return item.id === strBottomBarListSelectId
		})
		setTabBarBottomCurrent(nIndex)
	}, [arrBottomBarList, strBottomBarListSelectId])

	const handleTabbarSelect = value => {
		setBottomBarSelect(arrTabBarBottomList[value].id)
	}

	return (
		<PanelBottom customClass='flex-center-h button-bottom-wrap'>
			<AtTabBar
				fixed
				tabList={arrTabBarBottomList}
				current={nTabBarBottomCurrent}
				onClick={useSmartClick(handleTabbarSelect)}
			/>
		</PanelBottom>
	)
}
