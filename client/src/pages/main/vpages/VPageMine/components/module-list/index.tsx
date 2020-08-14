import Taro, { redirectTo } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { AtList, AtListItem } from 'taro-ui'
import { Block, View } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'
interface IModuleListProps {}

export default function ModuleList(props: IModuleListProps) {
	const {} = props

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<View className='module-list-wrap'>
			<ModuleTitle strTitle='我的工具' />
			<AtList className='module-list-content'>
				<AtListItem
					className='item-normal'
					title='头像秀'
					arrow='right'
					iconInfo={{ size: 25, color: 'red', value: 'iconfont icon-mine' }}
				/>
				<AtListItem
					className='item-normal'
					title='完美朋友圈'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'green',
						value: 'iconfont icon-calender',
					}}
				/>
				<AtListItem className='item-logout' title='退出登录' />
			</AtList>
		</View>
	)
}
