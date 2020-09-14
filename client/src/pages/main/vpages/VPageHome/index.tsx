import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import webApi from '@/api/testInfo'
import { uploadImage } from '@/utils/index'

import { View, Image, Button } from '@tarojs/components'
import Banner from './components/banner'

import './index.scss'

interface IVPageHomeProps {}

export default function VPageHome(props: IVPageHomeProps) {
	const {} = props

	const [arrBannerList, setBannerList] = useState<Array<any>>([
		{
			url:
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600104134488&di=ff3921057fd34c481129c1d9a021d786&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-a4bd40a3a2059c019258e5a802d20a3a_250x0.jpg%3Fsource%3D172ae18b',
		},
		{
			url:
				'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600104172469&di=18da93c85be74c3461ed892e36b23597&imgtype=0&src=http%3A%2F%2Fpic.xiami.net%2Fimages%2Falbum%2Fimg26%2F2102008326%2F1581328794694.jpg%401e_1c_100Q_185w_185h',
		},
		{
			url:
				'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1396524740,3853784379&fm=26&gp=0.jpg',
		},
	])

	const { nHeightNavigationHeader } = useSelector(
		state => state.appInfo.objAppHeight
	)

	const onLoad = async () => {
		// console.log('VPageHome')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleCreateArticleClick = async e => {
		const res = await webApi.spiderArticleInfo()
		console.log('handleTestClick', res)
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

	return (
		<View className='vpage-home-wrap'>
			{/* 占位栏 */}
			<View
				style={`height: ${Taro.pxTransform(nHeightNavigationHeader * 2)}`}
			></View>
			{/* banner */}
			<Banner arrBannerList={arrBannerList} />
			<Image
				style='width: 100%; '
				mode='widthFix'
				src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596946346198&di=6adc5bcab15d19b61cc1979bdb56b0ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F08%2F20161208165949_JHsUe.jpeg'
			></Image>
			{/* <Button onClick={handleCreateArticleClick}>爬取文章</Button> */}
			{/* <Button onClick={handleLoginClick}>强制登录</Button> */}
			{/* <Button onClick={handleNavigationJumpClick}>重复跳转</Button> */}
			<Button onClick={handleUploadImageClick}>上传图片</Button>
		</View>
	)
}
