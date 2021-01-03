import Taro from '@tarojs/taro'
import React, { Fragment } from 'react'
import { View } from '@tarojs/components'

import './index.scss'

interface IPanelBottomProps {
	fixed?: boolean
	isSafeBottom?: boolean
	backgroundColor?: string
	customClass?: string
	customStyle?: string
	children?: any
}

// 该组件使用要放在页面最后一个元素
// 以便去垫高面板的高度
export default function PanelBottom(props: IPanelBottomProps) {
	const {
		fixed = true, // 是否绝对定位
		isSafeBottom = true, // 是否开启X机型的底部保护
		backgroundColor = '#ffffff', // 面板背景色
		customClass = '',
		customStyle = '',
		children,
	} = props

	return (
		// {/* 面板 */}
		<View className='panel-bottom-wrap'>
			<View
				className={`${customClass}` + `${fixed ? ' fixed-panel ' : ''}`}
				style={`background-color: ${backgroundColor}; ` + `${customStyle}`}
			>
				{children}
			</View>
			{isSafeBottom && <View className='safe-bottom'></View>}
			{/* 占位内容 */}
			{fixed && (
				<Fragment>
					<View
						className={`${customClass}` + ` hidden-far `}
						style={`background-color: ${backgroundColor}; ` + `${customStyle}`}
					>
						{children}
					</View>
					{isSafeBottom && <View className='safe-bottom'></View>}
				</Fragment>
			)}
		</View>
	)
}
