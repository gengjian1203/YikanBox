export const CANVAS_WIDTH = 300
export const CANVAS_HEIGHT = 300

// 饰品列表
export const arrJewelryList = [
	{
		type: 'FLAG',
		name: '旗帜',
		list: [],
	},
	{
		type: 'SIGN',
		name: '标记',
		list: [
			{
				value: '😁',
			},
			{
				value: '🎁',
			},
			{
				value: '🍀',
			},
		],
	},
	{
		type: 'EMOJI',
		name: 'emoji',
		list: [],
	},
	{
		type: 'TEXT',
		name: '文字',
		list: [
			{
				value: 'Hello',
			},
			{
				value: 'Happy',
			},
			{
				value: 'Lucky',
			},
		],
	},
]

// 底部弹窗列表
export const arrActionSheetList = [
	{
		code: 'toggle-avatar',
		name: '使用自身头像',
	},
	{
		code: 'toggle-camera',
		name: '拍照',
	},
	{
		code: 'toggle-album',
		name: '从手机相册选择',
	},
]

export default {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	arrJewelryList,
	arrActionSheetList,
}
