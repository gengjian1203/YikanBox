import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import DetailBtntext from '../detail-btntext'
import DetailIcontext from '../detail-icontext'
import DetailInfo from '../detail-info'
import DetailForm from '../detail-form'
import DetailTimeline from '../detail-timeline'

import './index.scss'

interface IDetailContentParam {
	content?: string
}

export default function DetailContent(props: IDetailContentParam) {
	const { content = '' } = props

	const appInfo = useSelector(state => state.appInfo)

	const [arrContentList, setContentList] = useState<Array<any>>([])

	useEffect(() => {
		if (content) {
			setContentList(JSON.parse(content))
		}
	}, [content])

	const handleBtntextBtnClick = data => {
		console.log('handleBtntextBtnClick', data)
		switch (data.type) {
			case 'miniprogram':
				Taro.navigateToMiniProgram({
					appId: data.appId,
					success: res => {
						if (
							data.appId === 'wx821aadcd431646f9' &&
							res?.errMsg.includes('ok')
						) {
							Taro.reLaunch({
								url: appInfo.objAppInfo.strMainPath,
							})
						}
					},
				})
				break
			default:
				break
		}
	}

	return (
		<View className='detail-content-wrap'>
			{arrContentList.map((item, index) => (
				<View key={index} className='detail-content-item'>
					{
						{
							btntext: (
								<DetailBtntext
									data={item.data}
									onBtnClick={() => handleBtntextBtnClick(item.data)}
								/>
							),
							icontext: <DetailIcontext data={item.data} />,
							info: <DetailInfo data={item.data} />,
							form: <DetailForm data={item.data} />,
							timeline: <DetailTimeline data={item.data} />,
						}[item.type]
					}
				</View>
			))}
		</View>
	)
}
