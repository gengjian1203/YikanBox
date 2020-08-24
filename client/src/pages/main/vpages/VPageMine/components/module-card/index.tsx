import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useCheckLogin from '@/hooks/useCheckLogin'
import useIsLogin from '@/hooks/useIsLogin'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'

import './index.scss'

interface IModuleCardProps {}

export default function ModuleCard(props: IModuleCardProps) {
	const {} = props

	const isLogin = useIsLogin()

	const systemInfo = useSelector(state => state.systemInfo)
	const memberInfo = useSelector(state => state.memberInfo)

	const strDefaultName = '点击登录，去开启新的旅程~'

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleModuleCardClick = () => {
		console.log('handleModuleCardClick')
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	const handleClockInClick = () => {
		console.log('handleClockInClick')
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	return (
		<View
			className='module-card-wrap'
			style={`padding-top: ${Taro.pxTransform(systemInfo.statusBarHeight * 2)}`}
		>
			{/* 胶囊区占位 */}
			<View className='card-block'></View>
			<View className='card-info'>
				{/* 左侧 */}
				<View
					className='info-left flex-center-v'
					onClick={useThrottle(useCheckLogin(handleModuleCardClick))}
				>
					{isLogin ? (
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
				<View
					className='info-mid'
					onClick={useThrottle(useCheckLogin(handleModuleCardClick))}
				>
					<View className='mid-name'>
						{isLogin ? memberInfo.user_nickName : strDefaultName}
					</View>
					{isLogin && (
						<View className='mid-level'>Lv.{memberInfo.data_level}</View>
					)}
				</View>
				{/* 右侧 */}
				{/* <View
					className='info-right flex-center-v'
					style={`${isLogin ? '' : 'display: none; '}`}
					onClick={useThrottle(useCheckLogin(handleClockInClick))}
				>
					<View className='right-sign flex-center'>签到</View>
				</View> */}
			</View>
		</View>
	)
}
