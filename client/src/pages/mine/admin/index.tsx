import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import webApi from '@/api'
import { deepClone, deepCompare } from '@/utils/index'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import ButtonBottom from '@/components/button-bottom'
import PageContent from '@/components/page-content'
import ModuleTitle from '@/components/module-title'

import './index.scss'

interface IBottomBarItemType {
	code: string
	title: string
	enable: boolean
}

export default function Admin() {
	const [arrAdminListLocal, setAdminListLocal] = useState<Array<any>>([])
	const [isEnableSafeModeLocal, setEnableSafeModeLocal] = useState<boolean>(
		false
	)
	const [arrBottomBarListLocal, setBottomBarListLocal] = useState<
		Array<IBottomBarItemType>
	>([])

	const objAppInfo = useSelector(state => state.appInfo.objAppInfo)

	const arrAdminList = objAppInfo.arrAdminList
	const isEnableSafeMode = objAppInfo.isEnableSafeMode
	const arrBottomBarList = objAppInfo.arrBottomBarList

	const onLoad = () => {
		setAdminListLocal(arrAdminList)
		setEnableSafeModeLocal(isEnableSafeMode)
		setBottomBarListLocal(arrBottomBarList)
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 添加管理员
	const handleAddAdminListClick = () => {
		console.log('handleAddAdminListClick')
	}

	// 点击管理员列表
	const handleAdminListItemClick = itemAdmin => {
		console.log('handleAdminListItemClick', itemAdmin)
		if (itemAdmin.isLock) {
			return
		}
		Taro.showActionSheet({
			itemList: ['删除'],
			success: res => {
				if (res.tapIndex === 0) {
					setAdminListLocal(prevList => {
						const prevListTmp = deepClone(prevList)
						const nIndex = prevListTmp.findIndex(item => {
							return item.id === itemAdmin.id
						})
						if (nIndex >= 0) {
							prevListTmp.splice(nIndex, 1)
						}
						return prevListTmp
					})
				}
			},
		})
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

	// 海报分享开关
	const handleSharePanelItemChange = e => {
		console.log('handleSharePanelItemChange', e)
		setEnableSafeModeLocal(e.detail.value)
	}

	// 保存管理
	const handleButtonSaveClick = async () => {
		console.log('handleButtonSaveClick')
		// 比较管理员列表
		if (!deepCompare(arrAdminListLocal, arrAdminList)) {
			const res = await webApi.appInfo.updateAdminList(arrAdminListLocal)
			console.log('updateAdminList', res)
		}
		// 比较安全模式设置
		if (!deepCompare(isEnableSafeModeLocal, isEnableSafeMode)) {
			const res = await webApi.appInfo.updateEnableSafeMode(
				isEnableSafeModeLocal
			)
			console.log('updateBottomBarList', res)
		}
		// 比较底部导航
		if (!deepCompare(arrBottomBarListLocal, arrBottomBarList)) {
			const res = await webApi.appInfo.updateBottomBarList(
				arrBottomBarListLocal
			)
			console.log('updateBottomBarList', res)
		}
		Taro.reLaunch({
			url: '/pages/loading/index',
		})
	}

	const renderAdminListExtend = () => {
		return (
			<View
				className='admin-list-add flex-center-h'
				onClick={handleAddAdminListClick}
			>
				<View className='iconfont iconadd-select'></View>
				添加
			</View>
		)
	}

	return (
		<PageContent
			customClass='admin-wrap'
			isShowLeftIcon
			strNavigationTitle='我的管理'
		>
			<ModuleTitle
				strTitle={`管理员设置`}
				renderExtend={renderAdminListExtend}
			/>
			<AtList className='base-list'>
				{arrAdminListLocal.map((item, index) => {
					return (
						<AtListItem
							key={index}
							className='item-normal'
							title={item.id}
							onClick={() => handleAdminListItemClick(item)}
						/>
					)
				})}
			</AtList>
			{/* 安全模式设置 */}
			<ModuleTitle strTitle={`安全模式设置`} />
			<AtList className='base-list'>
				<AtListItem
					className='item-normal'
					isSwitch
					title='安全模式开关'
					switchIsCheck={isEnableSafeMode}
					onSwitchChange={handleSharePanelItemChange}
				/>
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
			<ButtonBottom text='保存' onClick={handleButtonSaveClick} />
		</PageContent>
	)
}
