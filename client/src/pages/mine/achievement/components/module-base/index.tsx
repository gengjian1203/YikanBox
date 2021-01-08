import Taro from '@tarojs/taro'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import memberInfoActions from '@/redux/actions/memberInfo'
import useThrottle from '@/hooks/useThrottle'
import webApi from '@/api'
import { hiddenString, simpleDate } from '@/utils/index'

import { AtList, AtListItem, AtFloatLayout } from 'taro-ui'
import { View } from '@tarojs/components'
import ModuleTitle from '@/components/module-title'

import { convertBadgeList, getBadgeName } from '../../utils/index'
import ItemBorder from '../item-border'

import './index.scss'

interface IModuleBaseProps {
	isStateMyself: boolean // 是否为自己
	objMemberInfo: any // 用户信息
}

export default function ModuleBase(props: IModuleBaseProps) {
	const { isStateMyself = true, objMemberInfo = {} } = props

	const [strBorderSelectCode, setBorderSelectCode] = useState<string>('') // 当前选中头像框
	const [isShowLayoutBorder, setShowLayoutBorder] = useState<boolean>(false) // 是否展示头像框列表
	const [arrBorderList, setBorderList] = useState<Array<any>>([]) // 头像框列表

	const memberInfo = useSelector(state => state.memberInfo)

	const { changeMineBorderCode } = useActions(memberInfoActions)

	// 调用接口：更新使用头像框
	const updateMineBorderCode = strMineBorderCode => {
		const param = {
			strMineBorderCode,
		}
		webApi.memberInfo.updateMineBorderCode(param)
	}

	// 应用选中头像框数据
	const applyBorderSelectCode = strCode => {
		setBorderSelectCode(strCode)
	}

	// 应用头像框列表数据
	const applyBorderList = arrList => {
		setBorderList(convertBadgeList(arrList))
	}

	// 自己的成就，监听Redux数据
	useEffect(() => {
		if (isStateMyself) {
			applyBorderSelectCode(memberInfo.data_strMineBorderCode)
		}
	}, [memberInfo.data_strMineBorderCode])

	useEffect(() => {
		if (isStateMyself) {
			applyBorderList(memberInfo.data_arrMineBadgeList)
		}
	}, [memberInfo.data_arrMineBadgeList])

	// 他人的成就，监听传入数据
	useEffect(() => {
		if (!isStateMyself) {
			applyBorderSelectCode(objMemberInfo.data_strMineBorderCode)
		}
	}, [objMemberInfo.data_strMineBorderCode])

	useEffect(() => {
		if (!isStateMyself) {
			applyBorderList(objMemberInfo.data_arrMineBadgeList)
		}
	}, [objMemberInfo.data_arrMineBadgeList])

	// 点击ID实现复制到剪贴板
	const handleIDCopyClick = () => {
		if (!isStateMyself) {
			return
		}
		Taro.setClipboardData({
			data: objMemberInfo._id,
			success: resForSet => {
				Taro.getClipboardData({
					success: resForGet => {
						// console.log('handleIDCopyClick', resForGet.data) // data
					},
				})
			},
		})
	}

	// 我的头像框
	const handleBorderShowClick = e => {
		if (!isStateMyself) {
			return
		}
		console.log('handleAvatarShowClick', e)
		setShowLayoutBorder(true)
	}

	// 跳转到推广人
	const handleJumpSourceClick = () => {
		if (objMemberInfo.share_sourceID) {
			Taro.navigateTo({
				url:
					`/pages/mine/achievement/index` +
					`?memberId=${objMemberInfo.share_sourceID}`,
			})
		}
	}

	// 浮窗事件：关闭
	const handleLayoutBorderClose = () => {
		// console.log('handleLayoutBorderClose')
		setShowLayoutBorder(false)
	}

	// 浮窗事件：点击头像框每项
	const handleBorderItemClick = objBorder => {
		// console.log('handleBorderItemClick', objBorder)
		if (strBorderSelectCode !== objBorder.code) {
			if (objBorder.time) {
				changeMineBorderCode(objBorder.code)
				updateMineBorderCode(objBorder.code)
			}
		} else {
			changeMineBorderCode('')
			updateMineBorderCode('')
		}
	}

	return (
		<View className='module-base-wrap'>
			<ModuleTitle strTitle='基本信息' />
			<AtList className='base-list'>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的昵称`}
					extraText={objMemberInfo.user_nickName}
				/>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的ID`}
					extraText={hiddenString(objMemberInfo._id)}
					arrow={isStateMyself ? 'right' : undefined}
					onClick={useThrottle(handleIDCopyClick)}
				/>
				{/* <AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的等级`}
					extraText={`Lv.${memberInfo.data_level}`}
				/> */}
				{/* <AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的称号`}
					extraText='初出茅庐'
					arrow={isStateMyself ? 'right' : undefined}
					onClick={useThrottle(handleAvatarShowClick)}
				/> */}
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的头像框`}
					extraText={getBadgeName(strBorderSelectCode)}
					arrow={isStateMyself ? 'right' : undefined}
					onClick={useThrottle(handleBorderShowClick)}
				/>
				<AtListItem
					className='item-normal'
					title={'注册时间'}
					extraText={simpleDate(objMemberInfo.app_createDate)}
				/>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的推广人`}
					arrow={objMemberInfo.share_sourceID === '' ? undefined : 'right'}
					extraText={hiddenString(objMemberInfo.share_sourceID)}
					onClick={useThrottle(handleJumpSourceClick)}
				/>
			</AtList>
			{/* 浮动弹窗-选择头像框 */}
			<AtFloatLayout
				isOpened={isShowLayoutBorder}
				title='选择头像框'
				scrollX
				onClose={handleLayoutBorderClose}
			>
				{arrBorderList.map((item, index) => {
					return (
						<ItemBorder
							key={index}
							objBorder={item}
							strBorderSelectCode={strBorderSelectCode}
							onItemClick={() => handleBorderItemClick(item)}
						/>
					)
				})}
			</AtFloatLayout>
		</View>
	)
}
