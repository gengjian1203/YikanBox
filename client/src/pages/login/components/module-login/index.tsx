import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'

import webApi from '@/api/memberInfo'
import { checkObjectEmpty } from '@/utils/index'

import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

interface IModuleLoginProps {}

export default function ModuleLogin(props: IModuleLoginProps) {
	const {} = props

	const [isLogining, setLogining] = useState<boolean>(false)

	const shareInfo = useSelector(state => state.shareInfo)

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleGetUserInfo = async e => {
		// console.log('handleGetUserInfo', e)
		const objUserInfo = e.detail.userInfo
		if (objUserInfo && !checkObjectEmpty(objUserInfo)) {
			setLogining(true)
			objUserInfo.share_sourceID = shareInfo.sourceID
			objUserInfo.share_shareType = shareInfo.shareType
			objUserInfo.share_sharePath = shareInfo.sharePath
			const res = await webApi.addMemberInfo(objUserInfo)
			// console.log('handleGetUserInfo addMemberInfo', res)
			setMemberInfo(res.data)
			setLogining(false)
			Taro.showToast({
				title: '登录成功',
				icon: 'success',
				duration: 1000,
			})
			setTimeout(() => {
				Taro.navigateBack()
			}, 500)
		}
	}

	return (
		<View className='module-login-wrap'>
			<AtButton
				className='button-login'
				openType='getUserInfo'
				type='primary'
				circle
				loading={isLogining}
				onGetUserInfo={handleGetUserInfo}
			>
				微信快捷登录
			</AtButton>
		</View>
	)
}
