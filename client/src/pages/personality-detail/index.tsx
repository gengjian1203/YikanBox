import React, { useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

export default function PersonalityDetail() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕

	useEffect(() => {
		Taro.hideShareMenu()
		setLoadComplete(true)
	}, [])

	return (
		isLoadComplete && (
			<View className='personality-detail-wrap'>
				<View className='personality-detail-name'>ddddd</View>
			</View>
		)
	)
}
