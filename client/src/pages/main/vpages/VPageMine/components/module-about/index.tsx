import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import memberInfoActions from '@/redux/actions/memberInfo'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'

import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

interface IModuleAboutProps {}

export default function ModuleAbout(props: IModuleAboutProps) {
	const {} = props

	const memberInfo = useSelector(state => state.memberInfo)

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 关于我们
	const handleAboutClick = e => {
		console.log('handleAboutClick', e)
		Taro.navigateTo({
			url: `/pages/mine/about/index`,
		})
	}

	// 退出登录
	const handleLogoutClick = e => {
		console.log('handleLogoutClick', e)
		Taro.showModal({
			title: '提示',
			content: '是否要退出登录',
			success: res => {
				if (res.confirm) {
					setMemberInfo({})
				}
			},
		})
	}

	return (
		<View className='module-list-wrap'>
			<ModuleTitle strTitle='关于我们' />
			<AtList className='module-list-content'>
				<AtListItem
					className='item-normal'
					title='关于我们'
					arrow='right'
					iconInfo={{
						size: 25,
						color: 'deepskyblue',
						value: 'iconfont icon-mine-about',
					}}
					onClick={useThrottle(useCheckLogin(handleAboutClick))}
				/>
				{memberInfo._id && (
					<AtListItem
						className='item-logout'
						title='退出登录'
						onClick={handleLogoutClick}
					/>
				)}
			</AtList>
		</View>
	)
}
