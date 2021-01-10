import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import ButtonIcon from '@/components/button-icon'
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
				<ButtonIcon
					key={index}
					value={item.icon}
					color={item.color}
					customStyle={`${
						nCurrentDetail !== index ? 'filter: brightness(70%); ' : ''
					}`}
					onClick={() => handleIconClick(item, index)}
				/>
			))}
		</PanelBottom>
	)
}
