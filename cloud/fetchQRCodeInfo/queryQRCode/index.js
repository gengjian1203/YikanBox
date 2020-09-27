/**
 * queryQRCode
 * 查询二维码信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function queryQRCode(data, db, cloud) {
	let objResult = {}
	let objQRCodeInfo = undefined
	let strId = ''

	try {
		objResult = {
			code: 200,
			data: await db.collection('qrcodeInfo').doc(data.strQRCodeId).get(),
		}
	} catch (e) {
		console.error('queryQRCode error', e)
	}

	return objResult
}

module.exports = queryQRCode
