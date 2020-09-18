import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import webApi from '@/api/appInfo'
import useThrottle from '@/hooks/useThrottle'
import { deepClone } from '@/utils/index'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import NavigationHeader from '@/components/NavigationHeader'
import ButtonBottom from '@/components/ButtonBottom'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

interface IBottomBarItemType {
	code: string
	title: string
	enable: boolean
}

export default function Admin() {
	const [arrAdminListLocal, setAdminListLocal] = useState<Array<string>>([])
	const [arrBottomBarListLocal, setBottomBarListLocal] = useState<
		Array<IBottomBarItemType>
	>([])

	const arrAdminList = useSelector(
		state => state.appInfo.objAppInfo.arrAdminList
	)
	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)

	const onLoad = () => {
		setAdminListLocal(arrAdminList)
		setBottomBarListLocal(arrBottomBarList)
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 点击管理员列表
	const handleAdminListItemClick = item => {
		console.log('handleAdminListItemClick', item)
	}

	// 底部导航数值改变
	const handleBottomBarSwitchChange = itemBar => {
		console.log('handleBottomBarSwitchChange', itemBar)
		setBottomBarListLocal(prevList => {
			const prevListTmp = deepClone(prevList)
			const nIndex = prevListTmp.findIndex(item => {
				return item.id === itemBar.id
			})
			if (nIndex >= 0) {
				prevListTmp[nIndex].enable = !prevListTmp[nIndex].enable
			}
			return prevListTmp
		})
	}

	// 保存管理
	const handleButtonSaveClick = async () => {
		console.log('handleButtonSaveClick')
		const res = await webApi.updateBottomBarList(arrBottomBarListLocal)
		console.log('handleButtonSaveClick', res)
		Taro.reLaunch({
			url: '/pages/loading/index',
		})
	}

	return (
		<View className='admin-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的管理' />
			<ModuleTitle strTitle={`管理员设置`} />
			<AtList className='base-list'>
				{arrAdminListLocal.map((item, index) => {
					return (
						<AtListItem
							key={index}
							className='item-normal'
							title={item}
							onClick={() => handleAdminListItemClick(item)}
						/>
					)
				})}
			</AtList>
			{/* 底部导航 */}
			<ModuleTitle strTitle={`底部导航设置`} />
			<AtList className='base-list'>
				{arrBottomBarListLocal.map((item, index) => {
					return (
						<AtListItem
							key={index}
							className='item-normal'
							isSwitch
							disabled={item.code === 'MINE'}
							title={item.title}
							switchIsCheck={item.enable}
							onSwitchChange={() => handleBottomBarSwitchChange(item)}
						/>
					)
				})}
			</AtList>
			{/* 保存按钮 */}
			<ButtonBottom onButtonClick={handleButtonSaveClick} />
		</View>
	)
}
