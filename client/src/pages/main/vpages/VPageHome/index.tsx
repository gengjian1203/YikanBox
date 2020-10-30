import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import webApi from '@/api'
import { deepClone, uploadImage } from '@/utils/index'
import ResourceManager from '@/services/ResourceManager'

import { View, Image, Button } from '@tarojs/components'
import ListFeed from '@/components/ListFeed'
import Banner from './components/banner'

import './index.scss'

interface IVPageHomeProps {}

export default function VPageHome(props: IVPageHomeProps) {
	const {} = props

	const [arrBannerLocalList, setBannerLocalList] = useState<Array<any>>([])
	const [strImg, setImg] = useState<string>('')

	const arrBannerList = useSelector(
		state => state.appInfo.objAppInfo.arrBannerList
	)
	const { nHeightNavigationHeader } = useSelector(
		state => state.appInfo.objAppHeight
	)
	const { arrArticleList } = useSelector(state => state.articleInfo)

	const loadBanner = async itemBanner => {
		const strImageUrlTmp = await ResourceManager.getUrl(itemBanner.strImageId)
		setBannerLocalList(prevBannerLocalList => {
			const arrListTmp = deepClone(prevBannerLocalList)
			const nIndex = prevBannerLocalList.findIndex(item => {
				return item.strImageId === itemBanner.strImageId
			})
			if (nIndex >= 0) {
				arrListTmp[nIndex] = {
					strImageId: itemBanner.strImageId,
					strNavUrl: itemBanner.strNavUrl,
					strImageUrl: strImageUrlTmp,
				}
			}
			return arrListTmp
		})
	}

	const onLoad = async () => {
		const strImgId =
			'cloud://online-z8369.6f6e-online-z8369-1259256375/resource/banner/img.jpeg'
		setBannerLocalList(arrBannerList)
		for (let item of arrBannerList) {
			loadBanner(item)
		}
		setImg(await ResourceManager.getUrl(strImgId))
		console.log('onLoad arrBannerList')
	}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	const handleCreateArticleClick = async e => {
		const res = await webApi.testInfo.spiderArticleInfo()
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

	const handleDetailClick = item => {
		console.log('handleDetailClick', item)
		Taro.navigateTo({
			url: `/pages/article-detail/index` + `?articleId=${item._id}`,
		})
	}

	return (
		<View className='vpage-home-wrap'>
			{/* 临时操作 */}
			{/* <Button onClick={handleCreateArticleClick}>爬取文章</Button> */}
			{/* <Button onClick={handleLoginClick}>强制登录</Button> */}
			{/* <Button onClick={handleNavigationJumpClick}>重复跳转</Button> */}
			{/* <Button onClick={handleUploadImageClick}>上传图片</Button> */}

			{/* 占位栏 */}
			<View
				style={`height: ${Taro.pxTransform(nHeightNavigationHeader * 2)}`}
			></View>
			{/* banner */}
			<Banner arrBannerList={arrBannerLocalList} />
			{/* <Image
				style={
					`width: 100%; ` +
					`margin-top: ${Taro.pxTransform(10)}; ` +
					`border-radius: ${Taro.pxTransform(6)};`
				}
				mode='widthFix'
				src={strImg}
			></Image> */}
			{/* feed流 */}
			<ListFeed
				strType='MOMENTS'
				arrList={arrArticleList}
				onDetailClick={handleDetailClick}
			/>
		</View>
	)
}
