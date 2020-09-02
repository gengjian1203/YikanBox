import Taro from '@tarojs/taro'
import React, { useState } from 'react'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import webApi from '@/api/memberInfo'

import { View, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

interface IBadgeCurtainInfoType {
	code?: string
	urlBadge?: string
	name?: string
	describe?: string
	time?: string
}

interface IModuleBadgeCurtainProps {
	objBadge: IBadgeCurtainInfoType
}

export default function ModuleBadgeCurtain(props: IModuleBadgeCurtainProps) {
	const { objBadge = {} } = props

	const [isActivating, setActivating] = useState<boolean>(false)

	const { pushMineBadgeList } = useActions(memberInfoActions)

	// 激活徽章
	const handleItemActivateClick = async () => {
		console.log('handleItemActivateClick', objBadge)
		setActivating(true)
		const param = {
			strBadgeCode: objBadge.code,
		}
		const res = await webApi.addMineBadge(param)
		setActivating(false)
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
					`${
						objBadge.time === '' ? 'curtain-gray ' : 'fade-in-from-grayscale '
					}`
				}
			/>
			<View className='curtain-desc'>【获取方法】{objBadge.describe}</View>
			<View
				className={
					`curtain-time ` + `{${objBadge.time === '' ? 'hidden ' : ''}}`
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
