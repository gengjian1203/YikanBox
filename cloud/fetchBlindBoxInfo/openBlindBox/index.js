const getBoxRandom = data => {
	const { arrBoxList, selectIndex, boxId, price, objExclude, objShaking } = data
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
	return arrBoxListReal[nIndexRandom]
}

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

	const objRandomInfo = getBoxRandom(data)

	const resMemberInfo = await db.collection('memberInfo').doc(strMemberId).get()
	const objMemberInfo = resMemberInfo.data
	// 人物表数据扣除金额
	objMemberInfo.data_money = objMemberInfo.data_money
		? objMemberInfo.data_money
		: 0
	const money = objMemberInfo.data_money - parseInt(data.price)

	console.log(
		'openBlindBox_6',
		money,
		objMemberInfo.data_money,
		data.price,
		objMemberInfo
	)
	if (money >= 0) {
		const date = new Date()
		const YYYY = date.getFullYear()
		const MM = date.getMonth() + 1
		const DD = date.getDate()
		const hh = date.getHours()
		const mm = date.getMinutes()
		const ss = date.getSeconds()
		const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

		// 更新人物表
		await db
			.collection('memberInfo')
			.doc(strMemberId)
			.update({
				data: {
					data_money: db.command.set(money),
				},
			})

		// 新增盲盒表
		const resAddBlindList = await db.collection('TB_BLIND_LIST').add({
			data: {
				...objRandomInfo,
				boxId: data.boxId,
				memberId: strMemberId,
				createDate: date, // 创建时间
				createTime: time, // 创建时间
			},
		})
		// 新增付款表
		await db.collection('TB_BILL').add({
			data: {
				memberId: strMemberId,
				sourceId: resAddBlindList._id,
				type: 'blind',
				money: -data.price, // 消费金额
				balance: money, // 余额
				createDate: date, // 创建时间
				createTime: time, // 创建时间
			},
		})

		try {
			objResult = {
				code: 200,
				data: { ...objRandomInfo, money },
			}
		} catch (e) {
			console.error('queryPersonalityInfo error', e)
		}
	} else {
		objResult = {
			code: 200,
			data: false,
		}
	}

	return objResult
}

module.exports = openBlindBox
