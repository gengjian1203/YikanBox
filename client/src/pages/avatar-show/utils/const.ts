export const CANVAS_WIDTH = 300
export const CANVAS_HEIGHT = 300

// 饰品列表
export const arrJewelryList = [
	{
		code: 'toggle-0',
		name: 'Hello',
		x: 10,
		y: 150,
	},
	{
		code: 'toggle-1',
		name: 'Happy',
		x: 50,
		y: 150,
	},
	{
		code: 'toggle-2',
		name: 'Lucky',
		x: 80,
		y: 150,
	},
	{
		code: 'toggle-3',
		name: '😁😁😁',
		x: 120,
		y: 150,
	},
	{
		code: 'toggle-4',
		name: '🎁🎁🎁',
		x: 160,
		y: 150,
	},
	{
		code: 'toggle-5',
		name: '🍀🍀🍀',
		x: 220,
		y: 150,
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
