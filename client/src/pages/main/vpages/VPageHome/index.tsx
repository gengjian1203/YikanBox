import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import { View, Image, Button } from '@tarojs/components'

import './index.scss'

interface IVPageHomeProps {}

export default function VPageHome(props: IVPageHomeProps) {
	const {} = props

	const appInfo = useSelector(state => state.appInfo)

	const { setBottomBarSelect } = useActions(appInfoActions)

	const onLoad = async () => {
		console.log('VPageHome')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleTestClick = () => {
		Taro.navigateTo({
			url: '/pages/login/index',
		})
	}

	return (
		<View className='vpage-home-wrap'>
			<Image
				style='width: 100%; '
				mode='widthFix'
				src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596946346198&di=6adc5bcab15d19b61cc1979bdb56b0ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F08%2F20161208165949_JHsUe.jpeg'
			></Image>
			<Button onClick={handleTestClick}>测试</Button>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
			<View>
				首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页首页
			</View>
		</View>
	)
}
