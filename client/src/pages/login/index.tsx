import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'

import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import ModuleSky from './components/module-sky'
import ModuleLogin from './components/module-login'
import ModuleAgreement from './components/module-agreement'
import ModuleWave from './components/module-wave'

import './index.scss'

export default function Login() {
	const onLoad = () => {
		Taro.hideShareMenu()
	}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<View>
			<NavigationHeader isShowLeftIcon isTransparent />
			<ModuleSky />
			<ModuleLogin />
			<ModuleAgreement />
			<ModuleWave />
		</View>
	)
}
