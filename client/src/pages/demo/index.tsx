import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import './index.scss'

interface IDemo {}
export default function Demo(props: IDemo) {
	useEffect(() => {
		console.log('Demo onload')
		return () => {
			console.log('Demo Unload')
		}
	}, [])
	return <View>hello demo</View>
}
Demo.defaultProps = {}
