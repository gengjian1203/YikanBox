import Taro from '@tarojs/taro'
import React from 'react'
import useThrottle from '@/hooks/useThrottle'
import { Block, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'

interface IButtonBottomProps {
	fixed?: boolean // 是否绝对定位
	title?: string // 按钮文案
	nTitleSize?: number // 按钮文案字号 单位rpx
	isSafeBottom?: boolean // 是否开启X机型的底部保护
	disabled?: boolean //表单属性 是否可提交
	customPanelClass?: string // 外部面板自定义类
	customPanelStyle?: string // 外部面板自定义样式
	customButtonClass?: string // 内部按钮自定义类
	customButtonStyle?: string // 内部按钮自定义类
	renderExtra?: any // 渲染拓展内容
	onButtonClick?: any // 点击按钮的回调
}

// 该组件使用要放在页面最后一个元素
// 以便去垫高保存按钮面板的高度
export default function ButtonBottom(props: IButtonBottomProps) {
	const {
		disabled = false,
		fixed = true,
		title = '保存',
		nTitleSize = 32,
		isSafeBottom = false,
		customPanelClass = '',
		customPanelStyle = '',
		customButtonClass = '',
		customButtonStyle = '',
		renderExtra = () => <Block></Block>,
		onButtonClick = () => true,
	} = props

	// 点击按钮
	const handleButtonClick = e => {
		console.log('handleButtonClick')
		onButtonClick(e)
	}

	const renderExtraView = () => {
		return <View className='extra-wrap'>{renderExtra()}</View>
	}

	return (
		// {/* 面板 */}
		<Block>
			<View
				className={
					`default-style-panel ` +
					`bg-white ` +
					`flex-center ` +
					`${fixed ? 'fixed-button ' : ''}` +
					`${customPanelClass}`
				}
				style={
					`${
						isSafeBottom
							? 'bottom: calc(constant(safe-area-inset-bottom)); bottom: calc(env(safe-area-inset-bottom)); '
							: 'bottom: 0; '
					} ` + `${customPanelStyle}`
				}
			>
				{/* 按钮 */}
				<View
					className={
						`default-style-button ` + `button-wrap ` + `${customButtonClass}`
					}
					style={`${customButtonStyle}`}
				>
					<AtButton
						type='primary'
						disabled={disabled}
						circle
						onClick={useThrottle(handleButtonClick, 1000)}
					>
						{/* 按钮文案 */}
						{title}
					</AtButton>
				</View>
				{/* 渲染拓展内容 */}
				{renderExtraView()}
			</View>
			{/* X机型底部保护模块 */}
			{isSafeBottom && (
				<View className='bg-white fixed-bottom safe-bottom'></View>
			)}
			{/* 占位内容 */}
			{fixed && (
				<Block>
					<View
						className={`default-style-panel ` + `${customPanelClass}`}
						style={`${customPanelStyle}`}
					></View>
					{isSafeBottom && <View className='safe-bottom'></View>}
				</Block>
			)}
		</Block>
	)
}
