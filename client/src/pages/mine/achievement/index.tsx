import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import webApi from '@/api'

import { View } from '@tarojs/components'
import PageContent from '@/components/page-content'
import ModuleBase from './components/module-base'
import ModuleBadge from './components/module-badge'

import './index.scss'

export default function Achievement() {
	const {
		params: { memberId = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false)
	const [isStateMyself, setStateMyself] = useState<boolean>(false)
	const [strNavigationTitle, setNavigationTitle] = useState<string>('')
	const [objMemberInfo, setMemberInfo] = useState<any>({})

	const memberInfo = useSelector(state => state.memberInfo)

	const onLoad = async () => {
		Taro.hideShareMenu()
		if (memberId === memberInfo._id) {
			setStateMyself(true)
			setNavigationTitle('我的成就')
			setMemberInfo(memberInfo)
		} else {
			setStateMyself(false)
			setNavigationTitle('Ta的成就')
			const param = {
				_id: memberId,
			}
			const res = await webApi.memberInfo.queryMemberInfo(param)
			// console.log('queryMemberInfo')
			setMemberInfo(res.data)
		}

		setLoadComplete(true)
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return (
		<PageContent
			customClass='achievement-wrap'
			isShowLeftIcon
			strNavigationTitle={strNavigationTitle}
		>
			{isLoadComplete ? (
				<Fragment>
					{/* 基本信息 */}
					<ModuleBase
						isStateMyself={isStateMyself}
						objMemberInfo={objMemberInfo}
					/>
					{/* 徽章信息 */}
					<ModuleBadge
						isStateMyself={isStateMyself}
						objMemberInfo={objMemberInfo}
					/>
				</Fragment>
			) : (
				<Fragment></Fragment>
			)}
		</PageContent>
	)
}
