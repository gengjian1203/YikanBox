import React from 'react'
import { AtButton } from 'taro-ui'
import PanelBottom from '@/components/panel-bottom'

import './index.scss'

interface IButtonBottomParam {
	text?: string // 按钮文案
	onClick?: (any?: any) => void
}

export default function ButtonBottom(props: IButtonBottomParam) {
	const { text = '', onClick } = props

	const handleButtonClick = e => {
		onClick && onClick(e)
	}

	return (
		<PanelBottom customClass='flex-center-h button-bottom-wrap'>
			<AtButton
				className='button-bottom'
				type='primary'
				size='normal'
				circle
				onClick={handleButtonClick}
			>
				{text}
			</AtButton>
		</PanelBottom>
	)
}
