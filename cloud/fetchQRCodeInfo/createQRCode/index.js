/**
 * createQRCode
 * 新增二维码信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */

async function createQRCode(data, db, cloud) {
	let objResult = {}
	let objQRCodeInfo = undefined
	let strId = ''
	try {
		objQRCodeInfo = await db
			.collection('qrcodeInfo')
			.where({
				strSharePath: data.strSharePath,
			})
			.get()
	} catch (e) {
		console.error('whereQRCode error', e)
	}

	// console.log('createQRCode.objQRCodeInfo.', objQRCodeInfo)
	const isOldQRCode = objQRCodeInfo.data[0] && objQRCodeInfo.data[0]._id

	if (isOldQRCode) {
		// 已经生成过二维码
		strId = objQRCodeInfo.data[0]._id
	} else {
		try {
			// 尚未生成过
			const objQRCode = {
				...data,
			}
			const res = await db.collection('qrcodeInfo').add({ data: objQRCode })
			// console.log('addQRCode', res)
			strId = res._id
		} catch (e) {
			console.error('addQRCode error', e)
		}
	}

	console.log('createQRCode.strId.', strId)
	const strCloudPath = `qrcode/${strId}.jpg`

	// if (!isOldQRCode) {
	try {
		// 获取二维码
		const res = await cloud.openapi.wxacode.getUnlimited({
			scene: strId,
			width: 280,
			isHyaline: true,
		})
		// 上传云存储
		await cloud.uploadFile({
			cloudPath: strCloudPath,
			fileContent: res.buffer, //处理buffer 二进制数据
		})
	} catch (e) {
		console.error('getUnlimited error', e)
	}
	// }

	objResult = {
		code: 200,
		data: { strQRCodeFileId: strCloudPath },
	}

	return objResult
}

module.exports = createQRCode
