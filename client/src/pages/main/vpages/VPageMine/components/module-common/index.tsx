import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import { View, ScrollView } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'
interface IModuleCommonProps {}

export default function ModuleCommon(props: IModuleCommonProps) {
	const {} = props

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 我的收藏
	const handleCollectionClick = e => {
		Taro.navigateTo({
			url: `/pages/collection-list/index`,
		})
	}

	// 我的成就
	const handleAchievementClick = e => {
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	// 我的推广
	const handlePopularizeClick = e => {
		Taro.navigateTo({
			url: `/pages/popularize-list/index`,
		})
	}

	return (
		<View className='module-common-wrap flex-center-v'>
			<ModuleTitle strTitle='常用功能' />
			<ScrollView className='module-common-content' scrollX>
				<View
					className='common-item'
					onClick={useThrottle(useCheckLogin(handleCollectionClick))}
				>
					<View className='flex-center-v'>
						<View className='common-item-icon flex-center iconfont icon-collection'></View>
						<View className='common-item-name'>我的收藏</View>
					</View>
				</View>
				<View
					className='common-item'
					onClick={useThrottle(useCheckLogin(handleAchievementClick))}
				>
					<View className='flex-center-v'>
						<View className='common-item-icon flex-center iconfont icon-achievement'></View>
						<View className='common-item-name'>我的成就</View>
					</View>
				</View>
				<View
					className='common-item'
					onClick={useThrottle(useCheckLogin(handlePopularizeClick))}
				>
					<View className='flex-center-v'>
						<View className='common-item-icon flex-center iconfont icon-popularize'></View>
						<View className='common-item-name'>我的推广</View>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}
