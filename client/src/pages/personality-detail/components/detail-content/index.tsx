import React, { useState, useEffect } from 'react'
import { AtTimeline } from 'taro-ui'
import { View } from '@tarojs/components'
import DetailInfo from '../detail-info'
import DetailForm from '../detail-form'
import './custom-taro-ui.scss'
import './index.scss'

interface IDetailContentParam {
	content?: string
}

export default function DetailContent(props: IDetailContentParam) {
	const { content = '' } = props

	const [arrContentList, setContentList] = useState<Array<any>>([])

	useEffect(() => {
		if (content) {
			setContentList(JSON.parse(content))
		}
	}, [content])

	console.log('DetailContent', arrContentList)

	return (
		<View className='detail-content-wrap'>
			{arrContentList.map((item, index) => (
				<View key={index} className='detail-content-item'>
					{
						{
							info: <DetailInfo data={item.data} />,
							form: <DetailForm data={item.data} />,
							timeline: <AtTimeline items={Array.from(item.data)} />,
						}[item.type]
					}
				</View>
			))}
		</View>
	)
}
