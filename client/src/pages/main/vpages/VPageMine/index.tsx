import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { View } from '@tarojs/components'
import ModuleCard from './components/module-card'
import ModuleCommon from './components/module-common'
import ModuleList from './components/module-list'
import ModuleAbout from './components/module-about'

import './index.scss'

interface IVPageMineProps {}

export default function VPageMine(props: IVPageMineProps) {
	const {} = props

	const onLoad = async () => {
		console.log('VPageMine')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<View className='vpage-mine-wrap'>
			{/* 个人信息 */}
			<ModuleCard />
			{/* 我的内容 */}
			<View className='mine-content'>
				{/* 常用模块 */}
				<ModuleCommon />
				{/* 列表模块 */}
				<ModuleList />
				{/* 关于模块 */}
				<ModuleAbout />
			</View>
		</View>
	)
}
