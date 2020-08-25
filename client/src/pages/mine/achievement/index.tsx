import Taro, { useRouter } from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import webApi from '@/api/appInfo'

import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import ModuleBase from './components/module-base'
import ModuleBadge from './components/module-badge'

import './index.scss'

export default function Achievement() {
	const {
		params: { memberId = '' },
	} = useRouter()

	const [isStateMyself, setStateMyself] = useState<boolean>(false)
	const [strNavigationTitle, setNavigationTitle] = useState<string>('')
	const [objMemberInfo, setMemberInfo] = useState<any>({})

	const memberInfo = useSelector(state => state.memberInfo)

	const onLoad = () => {
		Taro.hideShareMenu()
		if (memberId === memberInfo._id) {
			setStateMyself(true)
			setNavigationTitle('我的成就')
			setMemberInfo(memberInfo)
		} else {
			setStateMyself(false)
			setNavigationTitle('Ta的成就')
			setMemberInfo({})
		}
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<View className='achievement-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader
				isShowLeftIcon
				strNavigationTitle={strNavigationTitle}
			/>
			{/* 基本信息 */}
			<ModuleBase isStateMyself={isStateMyself} memberInfo={objMemberInfo} />
			{/* 徽章信息 */}
			<ModuleBadge isStateMyself={isStateMyself} memberInfo={objMemberInfo} />
		</View>
	)
}
