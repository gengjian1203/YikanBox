import Taro from '@tarojs/taro'
import React, { useEffect } from 'react'
import useActions from '@/hooks/useActions'
import useThrottle from '@/hooks/useThrottle'
import useCheckLogin from '@/hooks/useCheckLogin'
import memberInfoActions from '@/redux/actions/memberInfo'
import { hiddenString, simpleDate } from '@/utils/index'

import { AtList, AtListItem } from 'taro-ui'
import { View } from '@tarojs/components'
import ModuleTitle from '@/components/ModuleTitle'

import './index.scss'

interface IModuleBaseProps {
	isStateMyself: boolean // 是否为自己
	memberInfo: any // 用户信息
}

export default function ModuleBase(props: IModuleBaseProps) {
	const { isStateMyself = true, memberInfo = {} } = props

	const { setMemberInfo } = useActions(memberInfoActions)

	const onLoad = async () => {}

	useEffect(() => {
		onLoad()
		return () => {}
	}, [])

	// 点击ID实现复制到剪贴板
	const handleIDCopyClick = () => {
		Taro.setClipboardData({
			data: memberInfo._id,
			success: resForSet => {
				Taro.getClipboardData({
					success: resForGet => {
						console.log('handleIDCopyClick', resForGet.data) // data
					},
				})
			},
		})
	}

	// 我的头像秀
	const handleAvatarShowClick = e => {
		console.log('handleAvatarShowClick', e)
		Taro.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}

	// 跳转到推广人
	const handleJumpSourceClick = () => {
		if (memberInfo.share_sourceID) {
			Taro.navigateTo({
				url:
					`/pages/mine/achievement/index` +
					`?memberId=${memberInfo.share_sourceID}`,
			})
		}
	}

	return (
		<View className='module-base-wrap'>
			<ModuleTitle strTitle='基本信息' />
			<AtList className='base-list'>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的昵称`}
					extraText={memberInfo.user_nickName}
				/>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的ID`}
					extraText={hiddenString(memberInfo._id)}
					arrow={'right'}
					onClick={useThrottle(useCheckLogin(handleIDCopyClick))}
				/>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的等级`}
					extraText={`Lv.${memberInfo.data_level}`}
				/>
				{/* <AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的称号`}
					extraText='初出茅庐'
					arrow={isStateMyself ? 'right' : undefined}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/> */}
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的头像框`}
					extraText='新人之星'
					arrow={isStateMyself ? 'right' : undefined}
					onClick={useThrottle(useCheckLogin(handleAvatarShowClick))}
				/>
				<AtListItem
					className='item-normal'
					title={'注册时间'}
					extraText={simpleDate(memberInfo.app_createDate)}
				/>
				<AtListItem
					className='item-normal'
					title={`${isStateMyself ? '我' : 'TA'}的推广人`}
					arrow='right'
					extraText={hiddenString(memberInfo.share_sourceID)}
					onClick={useThrottle(useCheckLogin(handleJumpSourceClick))}
				/>
			</AtList>
		</View>
	)
}
