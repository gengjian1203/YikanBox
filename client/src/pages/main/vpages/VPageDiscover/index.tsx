import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import webApi from '@/api/articleInfo'

import { View } from '@tarojs/components'

import ModuleSwiper from './components/module-swiper'

import './index.scss'

interface IVPageDiscoverProps {}

export default function VPageDiscover(props: IVPageDiscoverProps) {
	const {} = props

	const [arrArticleList, setArticleList] = useState<Array<any>>()

	const onLoad = async () => {
		console.log('VPageDiscover')
		const objParams = {
			nPageNum: 0,
			nPageSize: 3,
		}
		const res = await webApi.queryArticleInfo(objParams)
		console.log('VPageDiscover onLoad', res)
		setArticleList(res.data)
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
