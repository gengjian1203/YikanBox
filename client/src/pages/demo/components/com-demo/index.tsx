import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import systemInfoActions from '@/redux/actions/systemInfo'

import { View } from '@tarojs/components'

import './index.scss'

interface IComDemoProps {
	content?: string
}

export default function ComDemo(props: IComDemoProps) {
	const { content = 'ComDemo' } = props

	const [strIcon, setIcon] = useState<string>('')

	const systemInfo = useSelector(state => state.systemInfo)

	const { setSystemInfo } = useActions(systemInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	return <View className='com-demo-wrap'>{content}</View>
}
