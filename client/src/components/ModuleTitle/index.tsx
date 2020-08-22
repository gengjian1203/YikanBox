import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

interface IModuleTitleProps {
	strTitle?: string
}

export default function ModuleTitle(props: IModuleTitleProps) {
	const { strTitle = '' } = props

	return (
		<View className='module-title-wrap'>
			<View className='module-title-content'>{strTitle}</View>
		</View>
	)
}
