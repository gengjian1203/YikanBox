import { CANVAS_WIDTH, CANVAS_HEIGHT } from './const'

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
 * 绘制饰品表
 * @param canvas
 * @param mapAvatarJewelry
 */
const drawAvatarJewelry = (canvas, mapAvatarJewelry) => {
	// if (strImageJewelry) {
	// 	canvas.drawImage(
	// 		strImageJewelry,
	// 		nImageJewelryX + nImageJewelryX_offset,
	// 		nImageJewelryY + nImageJewelryY_offset,
	// 		nImageJewelryW + nImageJewelryW_offset,
	// 		nImageJewelryH + nImageJewelryH_offset
	// 	)
	// }
}

/**
 * 绘制选中栏
 * @param canvas
 * @param objSelectJewelry
 */
const drawSelectBorder = (canvas, objSelectJewelry) => {
	// canvas.fillStyle = 'red'
	// canvas.setFontSize(50)
	// canvas.fillText(
	// 	strImageText,
	// 	nImageJewelryX + nImageJewelryX_offset,
	// 	nImageJewelryY + nImageJewelryY_offset
	// )
	canvas.fillStyle = 'white'
	canvas.strokeRect(30, 30, 340, 240)
}

/**
 * 绘制canvas主函数
 * @param canvas
 * @param avatarShowInfo
 */
export const drawMainCanvas = (canvas, avatarShowInfo) => {
	console.log('drawMainCanvas.')
	const { strAvatarImage, mapAvatarJewelry, objSelectJewelry } = avatarShowInfo
	if (canvas) {
		// 绘制头像底图
		drawAvatarImage(canvas, strAvatarImage)
		// 绘制饰品表
		drawAvatarJewelry(canvas, mapAvatarJewelry)
		// 绘制选中栏
		drawSelectBorder(canvas, objSelectJewelry)
		// 绘制
		canvas.draw()
	} else {
		console.log('drawMainCanvas canvas is null.')
	}
}

export default {
	drawMainCanvas,
}
