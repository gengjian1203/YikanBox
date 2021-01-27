import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'

import './index.scss'

interface IMenuType {
	code: string
	color: string
	icon: string
	title: string
}

interface IMenuParam {
	arrMenuList?: Array<IMenuType>
	onMenuClick?: (any?: any) => void
}

export default function Menu(props: IMenuParam) {
	const {
		arrMenuList = [], // 标题
		onMenuClick = () => {}, // 点击标题回调
	} = props

	const handleMenuClick = (e, item) => {
		e.stopPropagation()
		onMenuClick && onMenuClick(item)
	}

	return (
		<View className='menu-wrap'>
			{arrMenuList.map((item, index) => (
				<View
					key={index}
					className='flex-center-v menu-item'
					onClick={e => handleMenuClick(e, item)}
				>
					<ButtonIcon
						value={item.icon}
						width={100}
						height={100}
						radius={100}
						size={50}
						color={item.color}
						onClick={e => handleMenuClick(e, item)}
					/>
					<View className={`menu-item-title `}>{item.title}</View>
				</View>
			))}
		</View>
	)
}
