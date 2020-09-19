import Config from '@/config/index'
import { checkObjectEmpty, mergeObject } from '@/utils/index'
import ResourceManager from '@/services/ResourceManager'

import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	BORDER_COLOR,
	BORDER_BUTTON_SIZE,
	BORDER_BUTTON_RADIUS,
} from './const'

const strUrlButtonAdd = Config.cloudPath + '/avatar/button/add.png'
const strUrlButtonDelete = Config.cloudPath + '/avatar/button/delete.png'
const strUrlButtonFlip = Config.cloudPath + '/avatar/button/flip.png'
const strUrlButtonResize = Config.cloudPath + '/avatar/button/resize.png'
// const strUrlButtonResize = Config.cloudPath + '/avatar/jewelry/shengdanlaoren.png'

/**
 * 绘制头像底图
 * @param canvas
 * @param strAvatarImage
 */
const drawAvatarImage = (canvas, strAvatarImage) => {
	if (strAvatarImage) {
		canvas.drawImage(strAvatarImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	} else {
		console.log('drawMainCanvas strAvatarImage is null.')
	}
}

/**
 * 获取图片类型的饰品拓展数据
 * @param strSelectType
 * @param item
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const getRectJewelryExtend = (
	strSelectType,
	item,
	objSelectJewelry,
	objTouchPoint
) => {
	let rectJewelryExtend = { x: 0, y: 0, width: 0, height: 0 }
	if (item.id === objSelectJewelry.id) {
		switch (strSelectType) {
			// 改变选中框尺寸
			case 'BTN_RESIZE':
				rectJewelryExtend = { x: 0, y: 0, width: 0, height: 0 }
				break
			// 移动选中框
			case 'MOVE':
				rectJewelryExtend = {
					x: objTouchPoint.nTouchStartX_offset,
					y: objTouchPoint.nTouchStartY_offset,
					width: 0,
					height: 0,
				}
				break
			default:
				rectJewelryExtend = { x: 0, y: 0, width: 0, height: 0 }
				break
		}
	}
	return rectJewelryExtend
}

/**
 * 绘制饰品表
 * @param canvas
 * @param strSelectType
 * @param arrAvatarJewelry
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const drawAvatarJewelry = async (
	canvas,
	strSelectType,
	arrAvatarJewelry,
	objSelectJewelry,
	objTouchPoint
) => {
	// 绘制
	for (let item of arrAvatarJewelry) {
		const rectJewelryBase = {
			x: item.rect.x,
			y: item.rect.y,
			width: item.rect.width,
			height: item.rect.height,
		}
		let rectJewelryExtend = getRectJewelryExtend(
			strSelectType,
			item,
			objSelectJewelry,
			objTouchPoint
		)
		const rectJewelryResult = mergeObject(rectJewelryBase, rectJewelryExtend)
		console.log('drawAvatarJewelry', rectJewelryResult)

		switch (item.type) {
			case 'TEXT':
				const size =
					rectJewelryResult.width < rectJewelryResult.height
						? rectJewelryResult.width
						: rectJewelryResult.height
				canvas.setFontSize(size)
				canvas.fillText(
					item.value,
					rectJewelryResult.x,
					rectJewelryResult.y + size
				)
				break
			case 'IMAGE':
				canvas.drawImage(
					item.value,
					rectJewelryResult.x,
					rectJewelryResult.y,
					rectJewelryResult.width,
					rectJewelryResult.height
				)
				break
			default:
				break
		}
	}
}

/**
 * 绘制选中栏上的按钮
 * @param canvas
 * @param type
 */
const drawSelectBorderButton = async (canvas, rectBorder, type) => {
	// 处理数据
	let ptButtonPosition = {
		x: 10,
		y: 10,
	}
	let strButtonUrl = ''
	switch (type) {
		case 'FLIP':
			ptButtonPosition = {
				x: rectBorder.x,
				y: rectBorder.y,
			}
			strButtonUrl = strUrlButtonFlip
			break
		case 'ADD':
			ptButtonPosition = {
				x: rectBorder.x,
				y: rectBorder.y + rectBorder.height,
			}
			strButtonUrl = strUrlButtonAdd
			break
		case 'DELETE':
			ptButtonPosition = {
				x: rectBorder.x + rectBorder.width,
				y: rectBorder.y,
			}
			strButtonUrl = strUrlButtonDelete
			break
		case 'RESIZE':
			ptButtonPosition = {
				x: rectBorder.x + rectBorder.width,
				y: rectBorder.y + rectBorder.height,
			}
			strButtonUrl = strUrlButtonResize
			break
		default:
			return
	}
	// strButtonUrl = await ResourceManager.getStaticUrl(strButtonUrl)
	// console.log('drawSelectBorderButton', strButtonUrl, ptButtonPosition)
	// canvas.drawImage(
	// 	strButtonUrl,
	// 	ptButtonPosition.x,
	// 	ptButtonPosition.y,
	// 	BORDER_BUTTON_SIZE,
	// 	BORDER_BUTTON_SIZE
	// )
	canvas.beginPath()
	canvas.arc(
		ptButtonPosition.x,
		ptButtonPosition.y,
		BORDER_BUTTON_RADIUS,
		0,
		(360 * Math.PI) / 180
	)
	canvas.fillStyle = BORDER_COLOR
	canvas.fill()
	canvas.stroke()
}

/**
 * 绘制选中栏
 * @param canvas
 * @param strSelectType
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const drawSelectBorder = (
	canvas,
	strSelectType,
	objSelectJewelry,
	objTouchPoint
) => {
	const arrButtonList = ['FLIP', 'ADD', 'DELETE', 'RESIZE']
	// 边框基础属性
	const rectBorderBase = {
		x: objSelectJewelry.rect.x,
		y: objSelectJewelry.rect.y,
		width: objSelectJewelry.rect.width,
		height: objSelectJewelry.rect.height,
	}
	// 边框拓展属性
	let rectBorderExtend = { x: 0, y: 0, width: 0, height: 0 }
	switch (strSelectType) {
		// 改变选中框尺寸
		case 'BTN_RESIZE':
			rectBorderExtend = { x: 0, y: 0, width: 0, height: 0 }
			break
		// 移动选中框
		case 'MOVE':
			rectBorderExtend = {
				x: objTouchPoint.nTouchStartX_offset,
				y: objTouchPoint.nTouchStartY_offset,
				width: 0,
				height: 0,
			}
			break
		default:
			rectBorderExtend = { x: 0, y: 0, width: 0, height: 0 }
			break
	}
	console.log('drawSelectBorder', strSelectType, rectBorderBase, objTouchPoint)
	// 边框最终属性
	const rectBorderResult = mergeObject(rectBorderBase, rectBorderExtend)

	// 绘制
	canvas.strokeStyle = BORDER_COLOR
	canvas.strokeRect(
		rectBorderResult.x,
		rectBorderResult.y,
		rectBorderResult.width,
		rectBorderResult.height
	)
	// canvas.beginPath()
	// canvas.arc(100, 100, 100, 0, (360 * Math.PI) / 180)
	// canvas.stroke()
	// 绘制按钮
	for (let item of arrButtonList) {
		drawSelectBorderButton(canvas, rectBorderResult, item)
	}
}

/**
 * 绘制canvas主函数
 * @param canvas
 * @param avatarShowInfo
 * @param objTouchPoint
 */
export const drawMainCanvas = (canvas, avatarShowInfo, objTouchPoint) => {
	console.log('drawMainCanvas.')
	const {
		strAvatarImage,
		arrAvatarJewelry,
		objSelectJewelry,
		strSelectType,
	} = avatarShowInfo

	if (canvas) {
		// 绘制头像底图
		drawAvatarImage(canvas, strAvatarImage)
		// 绘制饰品表
		drawAvatarJewelry(
			canvas,
			strSelectType,
			arrAvatarJewelry,
			objSelectJewelry,
			objTouchPoint
		)
		// 绘制选中栏
		if (!checkObjectEmpty(objSelectJewelry)) {
			drawSelectBorder(canvas, strSelectType, objSelectJewelry, objTouchPoint)
		}

		// 绘制
		canvas.draw()
	} else {
		console.log('drawMainCanvas canvas is null.')
	}
}

export default {
	drawMainCanvas,
}
