import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import memberInfoActions from '@/redux/actions/memberInfo'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'

import ModuleTitle from '@/components/module-title'

import './index.scss'

interface IModuleAboutProps {}

export default function ModuleAbout(props: IModuleAboutProps) {
	const {} = props

	const appInfo = useSelector(state => state.appInfo)
	const memberInfo = useSelector(state => state.memberInfo)

	const { setMemberInfo } = useActions(memberInfoActions)

	const isAdmin =
		appInfo.objAppInfo.arrAdminList.findIndex(item => {
			return item.id === memberInfo._id
		}) >= 0

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 关于我们
	const handleAboutClick = e => {
		// console.log('handleAboutClick', e)
		Taro.navigateTo({
			url: `/pages/mine/about/index`,
		})
	}

	// 我的管理
	const handleAdminClick = e => {
		Taro.navigateTo({
			url: `/pages/mine/admin/index`,
		})
	}

	// 退出登录
	const handleLogoutClick = e => {
		// console.log('handleLogoutClick', e)
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
					onClick={useThrottle(handleAboutClick)}
				/>
				{isAdmin && (
					<AtListItem
						className='item-normal'
						title='我的管理'
						arrow='right'
						iconInfo={{
							size: 25,
							color: 'firebrick',
							value: 'iconfont icon-mine-admin',
						}}
						onClick={handleAdminClick}
					/>
				)}
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
