import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import { AtButton } from 'taro-ui'
import PanelBottom from '@/components/panel-bottom'

import './index.less'

interface IBottomWidgetParam {
	arrIconList?: Array<any>
	onIconClick?: any
}

export default function BottomWidget(props: IBottomWidgetParam) {
	const {
		arrIconList = [], // 图标列表
		onIconClick, // 点击图标响应事件
	} = props

	const handleIconClick = item => {
		onIconClick(item)
	}

	return (
		<PanelBottom
			backgroundColor='var(--color-default)'
			customClass='bottom-widget-wrap flex-around-h'
		>
			{arrIconList.map((item, index) => (
				<View
					className='widget-item-icon flex-center-v'
					style={`background: ${item.color}; `}
					key={index}
					onClick={() => handleIconClick(item)}
				>
					<View className={`iconfont ${item.icon}`}></View>
					<View>{item.title}</View>
				</View>
			))}
		</PanelBottom>
	)
}
