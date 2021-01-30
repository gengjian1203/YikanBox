/**
 * openBlindBox
 * 打开盲盒
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function openBlindBox(data, db, strMemberId) {
	let objResult = {}

	const { arrBoxList, selectIndex, objExclude, objShaking } = data
	const arrExclude = Object.values(objExclude).map(item => {
		return String(item)
	})
	console.log('openBlindBox_1', arrExclude)
	const arrShaking = (objShaking[parseInt(selectIndex)]
		? objShaking[parseInt(selectIndex)]
		: []
	).map(item => {
		return String(item)
	})
	console.log('openBlindBox_2', arrShaking)
	const arrIdTotal = arrExclude.concat(arrShaking)
	console.log('openBlindBox_3', arrIdTotal)
	const arrBoxListReal = arrBoxList.filter(item => {
		return !arrIdTotal.includes(item.id)
	})
	console.log('openBlindBox_4', arrBoxListReal)

	const nIndexRandom = Math.floor(Math.random() * arrBoxListReal.length)
	console.log('openBlindBox_5', nIndexRandom)

	// await db.collection('TB_BLIND_BOX').get(),
	try {
		objResult = {
			code: 200,
			data: arrBoxListReal[nIndexRandom],
		}
	} catch (e) {
		console.error('queryPersonalityInfo error', e)
	}

	return objResult
}

module.exports = openBlindBox
