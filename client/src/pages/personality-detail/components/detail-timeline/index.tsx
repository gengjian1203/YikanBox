import React, { useState, useEffect } from 'react'
import { AtTimeline } from 'taro-ui'
import { View } from '@tarojs/components'

import './custom-taro-ui.scss'
import './index.scss'

interface IDetailTimelineParam {
	data?: any
}

export default function DetailTimeline(props: IDetailTimelineParam) {
	const { data } = props

	return (
		<View className='detail-time-line-wrap'>
			<AtTimeline items={Array.from(data)} />
		</View>
	)
}
