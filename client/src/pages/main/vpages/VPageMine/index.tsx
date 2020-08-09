import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'

import { View } from '@tarojs/components'
import ModuleCard from './components/module-card'

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
			{/*  */}
			<ModuleCard />
			{/*  */}
			<View className='mine-content'>
				<View className='content-item'></View>
				<View className='content-item'></View>
				<View className='content-item'></View>
			</View>

			{/* 测试 */}
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
			<View>测试顶部导航变化</View>
		</View>
	)
}
