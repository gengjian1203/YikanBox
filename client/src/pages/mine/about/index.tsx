import React from 'react'

import { View } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'

import './index.scss'

export default function About() {
	const arrAboutContent = [
		'本人所制作小程序中的所有素材均来自互联网，',
		'原版权并非作者本人所有。',
		'如果本小程序内容或所用素材有侵权行为，',
		'请联系本人。',
		'QQ: 187076081',
		'电子邮箱: 187076081@qq.com',
		'本人所制作的小程序软件只是单纯娱乐学习，',
		'不用做任何商业性用途。',
		'任何团体和个人如果把此软件(或素材)做为商业用途，',
		'由此所带来的法律问题，',
		'作者本人不负任何责任！',
		'全程制作仅仅作者本人，',
		'本人不担保本程序可能给您的设备带来的任何后果!',
		'在此说明一下，以免误会！',
		'希望这款小程序能够真正的给大家带来便利。',
	]

	return (
		<View className='about-wrap'>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle='关于我们' />
			{/* 标题 */}
			<View className='about-title'></View>
			{/* 内容 */}
			{arrAboutContent.map((item, index) => {
				return (
					<View key={index} className='about-content'>
						{item}
					</View>
				)
			})}
		</View>
	)
}
