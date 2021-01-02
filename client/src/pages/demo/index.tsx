import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'

import webApi from '@/api'
import { shareType, processSharePath, getArticleTagName } from '@/utils/index'

import { View, Text } from '@tarojs/components'
import NavigationHeader from '@/components/NavigationHeader'
import Tag from '@/components/Tag'
import { AtButton } from 'taro-ui'

import './index.scss'

export default function Demo() {
	const {
		params: { strTitle = '' },
	} = useRouter()

	const store = useSelector(state => state)
	const memberInfo = useSelector(state => state.memberInfo)
	const { arrArticleList } = useSelector(state => state.articleInfo)

	const { addCollectionArticleInfo, removeCollectionArticleInfo } = useActions(
		memberInfoActions
	)

	const onLoad = () => {
		console.log('Demo onload')
		Taro.hideShareMenu()
	}

	const onUnload = () => {
		console.log('Demo Unload')
	}

	useEffect(() => {
		onLoad()
		return () => {
			onUnload()
		}
	}, [])

	return (
		<Fragment>
			{/* 顶部导航 */}
			<NavigationHeader isShowLeftIcon strNavigationTitle={strTitle} />
			{/* 我要邀请 */}
			<AtButton type='primary' full openType='share'>
				我要邀请
			</AtButton>
			{/* 标题 */}
			<View className='article-detail-item'>
				<Tag
					customWrapClass='item-tag'
					strName={'aaa'}
					strColor='#ffffff'
					strBKColor='#0084ff'
				/>
				<Text className='item-title'>memberInfo._id</Text>
			</View>
			{/* 作者 */}
			<View className='article-detail-item'>
				<Text className='item-value text-ellipsis'>作者：ccc</Text>
			</View>
			{/* 时间 */}
			<View className='article-detail-item'>
				<Text className='item-value text-ellipsis'>时间：ddd</Text>
			</View>
			{/* 富文本翻译 */}
			<poster
				style='overflow: hidden;'
				compress={3}
				html=''
				lazy-load
				selectable
				show-with-animation
			/>
		</Fragment>
	)
}
