import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import webApi from '@/api'

import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import { checkBadgeActivate } from '../../utils/index'

import './index.scss'

interface IBadgeCurtainInfoType {
	code: string
	urlBadge?: string
	name?: string
	describe?: string
	time?: string
}

interface IModuleBadgeCurtainProps {
	objBadge: IBadgeCurtainInfoType
}

export default function ModuleBadgeCurtain(props: IModuleBadgeCurtainProps) {
	const { objBadge } = props

	const [isActivating, setActivating] = useState<boolean>(false) // 激活中状态
	const [isNewActivate, setNewActivate] = useState<boolean>(false) // 新激活状态

	const store = useSelector(state => state)

	const { pushMineBadgeList } = useActions(memberInfoActions)

	// 激活徽章
	const handleItemActivateClick = async () => {
		// console.log('handleItemActivateClick', objBadge)
		if (!checkBadgeActivate(objBadge, store)) {
			Taro.showToast({
				title: '抱歉，暂不满足激活条件',
				icon: 'none',
			})
			return
		}
		setActivating(true)
		const param = {
			strBadgeCode: objBadge.code,
		}
		const res = await webApi.memberInfo.addMineBadge(param)
		setActivating(false)
		setNewActivate(true)
		pushMineBadgeList({
			code: res.data.code,
			time: res.data.time,
		})
	}

	return (
		<View className='module-curtain-content'>
			<Image
				src={objBadge.urlBadge}
				mode='aspectFit'
				className={
					`curtain-image ` +
					`${objBadge.time === '' ? 'curtain-gray ' : ''}` +
					`${isNewActivate ? 'fade-in-from-grayscale ' : ''}`
				}
			/>
			<View className='curtain-value'>【徽章名称】{objBadge.name}</View>
			<View className='curtain-value'>【获取方法】{objBadge.describe}</View>
			<View
				className={
					`curtain-value ` + `{${objBadge.time === '' ? 'hidden ' : ''}}`
				}
			>
				【获取时间】{objBadge.time}
			</View>
			<AtButton
				className={
					`curtain-button ` + `{${objBadge.time === '' ? '' : 'hidden '}}`
				}
				type='primary'
				size='small'
				loading={isActivating}
				onClick={useThrottle(handleItemActivateClick)}
			>
				激活
			</AtButton>
		</View>
	)
}
