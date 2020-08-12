import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { View, Image } from '@tarojs/components'

import './index.scss'

const strDefaultName = '点击登录，一起去开启新的旅程~'

interface IModuleCardProps {}

export default function ModuleCard(props: IModuleCardProps) {
	const {} = props

	const [isLogined, setLogined] = useState<boolean>(false)

	const systemInfo = useSelector(state => state.systemInfo)
	const memberInfo = useSelector(state => state.memberInfo)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	useEffect(() => {
		console.log('useEffect memberInfo.user_openid', memberInfo.user_openid)
		if (memberInfo.user_openid) {
			setLogined(true)
		} else {
			setLogined(false)
		}
		return () => {}
	}, [memberInfo.user_openid])

	const handleModuleCardClick = e => {
		console.log('handleModuleCardClick', e)
		if (isLogined) {
			Taro.showToast({ title: '您已经登录了~', icon: 'none' })
		} else {
			Taro.navigateTo({
				url: '/pages/login/index',
			})
		}
	}

	const handleModuleCardClick11 = e => {
		console.log('handleModuleCardClick11', e)
	}

	return (
		<View
			className='module-card-wrap'
			style={`padding-top: ${Taro.pxTransform(systemInfo.statusBarHeight * 2)}`}
			onClick={handleModuleCardClick11}
		>
			{/* 胶囊区占位 */}
			<View className='card-block'></View>
			<View className='card-info'>
				{/* 左侧 */}
				<View className='info-left' onClick={handleModuleCardClick}>
					{isLogined ? (
						<Image
							className='left-avatar'
							mode='scaleToFill'
							src={memberInfo.user_avatarUrl}
						/>
					) : (
						<View className='left-avatar iconfont icon-default-avatar'></View>
					)}
				</View>
				{/* 中间 */}
				<View className='info-mid' onClick={handleModuleCardClick}>
					<View className='mid-name'>
						{isLogined ? memberInfo.user_nickName : strDefaultName}
					</View>
					{isLogined && (
						<View className='mid-level'>Lv.{memberInfo.data_level}</View>
					)}
				</View>
				{/* 右侧 */}
				{isLogined && (
					<View className='info-right'>
						<View className='right-sign'>签到</View>
					</View>
				)}
			</View>
		</View>
	)
}
