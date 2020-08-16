import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'

import ModuleSwiper from './components/module-swiper'

import './index.scss'

interface IVPageDiscoverProps {}

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const {} = props

	const [arrArticleList, setArticleList] = useState<Array<any>>([
		{
			title: '标题一',
			content: '冬瓜冬瓜冬瓜冬瓜在下是冬瓜',
		},
		{
			title: '标题二',
			content: '西瓜西瓜🍉西瓜在下是西瓜',
		},
		{
			title: '标题三',
			content: '冬瓜冬瓜冬瓜冬瓜在下是冬瓜',
		},
		{
			title: '标题四',
			content: '丝瓜丝瓜丝瓜瓜在下是丝瓜瓜',
		},
		{
			title: '标题五',
			content: '苦瓜苦瓜苦瓜苦瓜在下是苦瓜瓜',
		},
		{
			title: '标题六',
			content: 'w倭瓜倭瓜倭瓜在下是倭瓜瓜瓜',
		},
	])

	const onLoad = async () => {
		console.log('VPageDiscover')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<View className='vpage-discover-wrap'>
			<ModuleSwiper arrArticleList={arrArticleList} />
		</View>
	)
}
