import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import { AtButton } from 'taro-ui'
import PanelBottom from '@/components/panel-bottom'

import './index.less'

interface IBottomWidgetParam {
	arrIconList?: Array<any>
	nCurrentDetail?: number
	onIconClick?: any
}

export default function BottomWidget(props: IBottomWidgetParam) {
	const {
		arrIconList = [], // 图标列表
		nCurrentDetail = 0, // 选中图标
		onIconClick, // 点击图标响应事件
	} = props

	const handleIconClick = (item, index) => {
		onIconClick(index)
	}

	return (
		<PanelBottom
			backgroundColor='var(--color-default)'
			customClass={`bottom-widget-wrap ` + `flex-around-h `}
		>
			{arrIconList.map((item, index) => (
				<AtButton
					className='widget-item'
					key={index}
					onClick={() => handleIconClick(item, index)}
				>
					<View
						className={
							`flex-center-v ` +
							`iconfont ` +
							`${item.icon} ` +
							`widget-item-icon `
						}
						style={`background: ${item.color};`}
					></View>
				</AtButton>
			))}
		</PanelBottom>
	)
}
