import React from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import NavigationHeader from '@/components/NavigationHeader'
import ButtonBottom from '@/components/ButtonBottom'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

export default function Admin() {
	const arrBottomBarList = useSelector(
		state => state.appInfo.objAppInfo.arrBottomBarList
	)

	// 底部导航切换
	const handleBottomBarSwitchChange = (e, item) => {
		console.log('handleBottomBarSwitchChange', e, item)
	}

	// 保存管理
	const handleButtonSaveClick = () => {
		console.log('handleButtonSaveClick')
	}

	return (
		<View className='admin-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='我的管理' />
			{/* 底部导航 */}
			<ModuleTitle strTitle={`底部导航设置`} />
			<AtList className='base-list'>
				{arrBottomBarList.map((item, index) => {
					return (
						<AtListItem
							key={index}
							className='item-normal'
							isSwitch
							disabled={item.code === 'MINE'}
							title={item.title}
							switchIsCheck={item.enable}
							onSwitchChange={e => handleBottomBarSwitchChange(e, item)}
						/>
					)
				})}
			</AtList>
			{/* 保存按钮 */}
			<ButtonBottom onButtonClick={handleButtonSaveClick} />
		</View>
	)
}
