/**
 * checkImage
 * 校验图片的敏感信息
 * @param {*} data
 * @param {*} cloud
 * @returns
 */

async function checkImage(data, cloud) {
	let objResult = {}
	let buffer = ''
	try {
		const res = await cloud.downloadFile({
			fileID: data.value,
		})
		buffer = res.fileContent
	} catch (err) {
		console.error('readFileSync Error.', err)
	}
	// console.log('downloadFile3', JSON.stringify(buffer))

	if (buffer) {
		try {
			const res = await cloud.openapi.security.imgSecCheck({
				media: {
					contentType: 'image/png',
					value: buffer,
				},
			})

			console.log('checkImage', res)
			if (res && res.errCode === 0) {
				// 非敏感图片,如果路径是temp则删除
				const nEnd = data.value.lastIndexOf('/')
				const nStart = nEnd - 4
				const str = data.value.substring(nStart, nEnd)

				if (str === 'temp') {
					cloud.deleteFile({
						fileList: [data.value],
					})
				}
			} else {
				// 敏感图片一定删除
				cloud.deleteFile({
					fileList: [data.value],
				})
			}
			objResult = {
				code: 200,
				data: res,
			}
		} catch (err) {
			console.error('checkImage', err)
			// 敏感图片一定删除
			cloud.deleteFile({
				fileList: [data.value],
			})
		}
	}

	return objResult
}

module.exports = checkImage
