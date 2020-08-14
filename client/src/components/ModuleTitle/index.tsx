import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from '@tarojs/components'

import './index.scss'

interface IModuleTitleProps {
	strTitle?: string
}

export default function ModuleTitle(props: IModuleTitleProps) {
	const { strTitle = '' } = props

	return <View className='module-tile-content'>{strTitle}</View>
}
