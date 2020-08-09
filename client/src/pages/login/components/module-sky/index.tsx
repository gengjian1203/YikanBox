import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

interface IModuleSkyProps {}

export default function ModuleSky(props: IModuleSkyProps) {
	const {} = props

	return (
		<View className='module-sky-wrap'>
			<View className='module-sky-content'>欢迎登录,</View>
			<View className='module-sky-content'>准备开启新的旅程吧~</View>
		</View>
	)
}
