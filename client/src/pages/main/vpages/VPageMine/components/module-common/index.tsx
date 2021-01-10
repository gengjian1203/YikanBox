import Taro from '@tarojs/taro'
import React from 'react'
import { useSelector } from 'react-redux'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import { View, ScrollView } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'
import ModuleTitle from '@/components/module-title'

import './index.scss'
interface IModuleCommonProps {}

export default function ModuleCommon(props: IModuleCommonProps) {
	const {} = props

	const memberInfo = useSelector(state => state.memberInfo)

	const arrCommonList = [
		{
			name: 'collection',
			icon: 'iconcollection',
			size: 80,
			color: 'green',
			title: '我的收藏',
		},
		{
			name: 'achievement',
			icon: 'iconchengjiu',
			size: 60,
			color: 'orange',
			title: '我的成就',
		},
		{
			name: 'popularize',
			icon: 'iconziyuan',
			size: 70,
			color: 'cadetblue',
			title: '我的邀请',
		},
	]

	const handleIconClick = item => {
		switch (item.name) {
			// 我的收藏
			case 'collection':
				Taro.navigateTo({
					url: `/pages/mine/collection/index`,
				})
				break
			// 我的成就
			case 'achievement':
				Taro.navigateTo({
					url: `/pages/mine/achievement/index` + `?memberId=${memberInfo._id}`,
				})
				break
			// 我的邀请
			case 'popularize':
				Taro.navigateTo({
					url: `/pages/mine/popularize/index`,
				})
				break
			default:
				break
		}
	}

	return (
		<View className='flex-center-v module-common-wrap'>
			<ModuleTitle strTitle='常用功能' />
			<ScrollView className='flex-start-h module-common-content' scrollX>
				{arrCommonList.map((item, index) => (
					<View
						key={index}
						className='flex-center-v common-item'
						onClick={useThrottle(useCheckLogin(() => handleIconClick(item)))}
					>
						<ButtonIcon value={item.icon} size={item.size} color={item.color} />
						<View className='common-item-name'>{item.title}</View>
					</View>
				))}
			</ScrollView>
		</View>
	)
}
