import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useCheckLogin from '@/hooks/useCheckLogin'
import useIsLogin from '@/hooks/useIsLogin'
import useThrottle from '@/hooks/useThrottle'

import { View, Image } from '@tarojs/components'

import strAvatarBorderUrl_01 from '@/images/mine/border_01.png'
import strAvatarBorderUrl_02 from '@/images/mine/border_02.png'
import strAvatarBorderUrl_03 from '@/images/mine/border_03.png'
import strAvatarBorderUrl_04 from '@/images/mine/border_04.png'
import strAvatarBorderUrl_05 from '@/images/mine/border_05.png'
import strAvatarBorderUrl_06 from '@/images/mine/border_06.png'
import strAvatarBorderUrl_07 from '@/images/mine/border_07.png'

import { getBadgeUrl } from '../../utils/index'

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
		// console.log('handleModuleCardClick')
		Taro.navigateTo({
			url: `/pages/mine/achievement/index` + `?memberId=${memberInfo._id}`,
		})
	}

	const handleClockInClick = () => {
		// console.log('handleClockInClick')
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
						<View className='left-avatar'>
							<Image
								className='image-avatar'
								mode='scaleToFill'
								src={memberInfo.user_avatarUrl}
							/>
							{true && (
								<Image
									className='image-border'
									mode='scaleToFill'
									src={getBadgeUrl(memberInfo.data_strMineBorderCode)}
								/>
							)}
						</View>
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
					{/* {isLogin && (
						<View className='mid-level'>Lv.{memberInfo.data_level}</View>
					)} */}
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
