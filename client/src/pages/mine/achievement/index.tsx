import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import webApi from '@/api/appInfo'

import { Block } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function Achievement() {
	const {
		params: { memberId = '' },
	} = useRouter()

	const [isStateMyself, setStateMyself] = useState<boolean>(false)
	const [strNavigationTitle, setNavigationTitle] = useState<string>('')

	const memberInfo = useSelector(state => state.memberInfo)

	const onLoad = () => {
		Taro.hideShareMenu()
		if (memberId === memberInfo._id) {
			setStateMyself(true)
			setNavigationTitle('我的成就')
		} else {
			setStateMyself(false)
			setNavigationTitle('Ta的成就')
		}
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])
	return (
		<Block>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle={strNavigationTitle}
			/>
		</Block>
	)
}
