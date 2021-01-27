import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AtCalendar } from 'taro-ui'
import Taro from '@tarojs/taro'
import webApi from '@/api'
import useCheckLogin from '@/hooks/useCheckLogin'
import { uploadImage } from '@/utils/index'

import { View, Button } from '@tarojs/components'
import Banner from './components/banner'
import Menu from './components/menu'
import Tab from './components/tab'

import './index.scss'

interface IVPageHomeProps {
	customWrapClass?: string
	customWrapStyle?: string
	arrBannerLocalList?: Array<any>
	arrArticleList?: Array<any>
	showBottomLoadingTip?: boolean
}

export default function VPageHome(props: IVPageHomeProps) {
	const {
		customWrapClass = '',
		customWrapStyle = '',
		arrBannerLocalList = [],
		arrArticleList = [],
		showBottomLoadingTip = false,
	} = props

	const [currentDate, setCurrentDate] = useState<Date>()
	const [menuList, setMenuList] = useState<any>([])
	const [tabList, setTabList] = useState<any>([])

	const {
		objAppInfo: { isEnableSafeMode },
	} = useSelector(state => state.appInfo)

	useEffect(() => {
		setCurrentDate(new Date())
		setTabList([
			{ title: '标签页1' },
			{ title: '标签页2' },
			// { title: '标签页3' },
			// { title: '标签页4' },
			// { title: '标签页5' },
			// { title: '标签页6' },
		])
		setMenuList([
			{
				code: 'box',
				color: '#38ae92',
				icon: 'iconchoujiang',
				title: '盲盒抽奖',
			},
		])
		return () => {}
	}, [])

	const handleTestClick = async () => {}

	const handleCreateArticleClick = async e => {
		const res = await webApi.testInfo.spiderArticleInfo()
		console.log('handleCreateArticleClick', res)
	}

	const handleLoginClick = e => {
		Taro.navigateTo({
			url: '/pages/login/index',
		})
	}

	const handleNavigationJumpClick = e => {
		Taro.navigateTo({
			url: '/pages/main/index',
		})
	}

	const handleUploadImageClick = e => {
		console.log('handleUploadImageClick')
		Taro.chooseImage({
			count: 1,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: async resChoose => {
				Taro.showLoading({
					title: '加载中...',
				})
				if (
					resChoose.tempFiles[0] &&
					resChoose.tempFiles[0].size > 1024 * 1024
				) {
					Taro.showToast({
						title: '图片不能大于1M',
						icon: 'none',
					})
					return
				}
				const strTempPath = resChoose.tempFilePaths[0]
				const res = await uploadImage(strTempPath, 'resource/')
				console.log('uploadImage', res)
				Taro.hideLoading()
				if (res === '') {
					Taro.showToast({
						title: '图片上传失败，请重新上传',
						icon: 'none',
					})
				} else if (res === 'DANGER IMAGE') {
					Taro.showToast({
						title: '图片疑似有敏感内容，请更换其他图片',
						icon: 'none',
					})
				} else {
					Taro.showToast({
						title: res,
						icon: 'none',
					})
				}
			},
		})
	}

	// 点击菜单项
	const handleMenuClick = item => {
		console.log('handleMenuClick', item)
		switch (item.code) {
			case 'box':
				Taro.navigateTo({
					url: `/pages/blind-box/hall-room/index`,
				})
				break
			default:
				break
		}
	}

	// 切换tab
	const handleTabChange = current => {
		console.log('handleTabChange', current)
	}

	// 点击详情
	const handleDetailClick = item => {
		console.log('handleDetailClick', item)
		Taro.navigateTo({
			url: `/pages/article-detail/index` + `?articleId=${item._id}`,
		})
	}

	return (
		<View
			className={`vpage-home-wrap ${customWrapClass}`}
			style={customWrapStyle}
		>
			{/* banner */}
			<View className='block-line'></View>
			<Banner arrBannerList={arrBannerLocalList} />

			{/* 临时操作 */}
			<View className='block-line'></View>
			{/* <Button onClick={handleTestClick}>测试按钮</Button> */}
			{/* <Button onClick={handleCreateArticleClick}>爬取文章</Button> */}
			{/* <Button onClick={handleLoginClick}>强制登录</Button> */}
			{/* <Button onClick={handleNavigationJumpClick}>重复跳转</Button> */}
			{/* <Button onClick={handleUploadImageClick}>上传图片</Button> */}

			{/* tab */}
			<View className='block-line'></View>
			{isEnableSafeMode ? (
				<AtCalendar isMultiSelect mark={[{ value: currentDate }]} />
			) : (
				<Fragment>
					<Menu
						arrMenuList={menuList}
						onMenuClick={useCheckLogin(handleMenuClick)}
					/>
					<Tab
						tabList={tabList}
						arrList={arrArticleList}
						showBottomLoadingTip={showBottomLoadingTip}
						onTabChange={handleTabChange}
						onDetailClick={handleDetailClick}
					/>
				</Fragment>
			)}
		</View>
	)
}
