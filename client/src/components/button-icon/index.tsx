import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { View } from '@tarojs/components'
import './index.less'

interface IButtonIconParam {
	value?: string
	size?: number
	color?: string
	customStyle?: string
	onClick?: () => void
}

export default function ButtonIcon(props: IButtonIconParam) {
	const {
		value = '', // 标题
		size = 80, // 字号
		color = 'var(--color-primary)', // 按钮背景色
		customStyle = '',
		onClick = () => {}, // 点击按钮回调
	} = props

	const handleIconClick = () => {
		onClick && onClick()
	}

	return (
		<AtButton className='button-icon-wrap' onClick={handleIconClick}>
			<View
				className={
					`flex-center-v ` + `iconfont ` + `${value} ` + `button-icon-content `
				}
				style={
					`background-image: ` +
					`linear-gradient( ` +
					`135deg, ` +
					`${color}, ` +
					`80%, ` +
					`var(--color-white, #ffffff)); ` +
					`font-size: ${Taro.pxTransform(size)}; ` +
					`${customStyle}; `
				}
			></View>
		</AtButton>
	)
}
