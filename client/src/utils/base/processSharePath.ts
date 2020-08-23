interface ISharePathType {
	sharePath: string
	[key: string]: any
}

/**
 * 整理分享参数
 * @param objParams 分享传递的参数
 * @param store Redux数据
 * @return 返回带参数可以用于直接跳转的链接字符串
 */
export function processSharePath(objParams: ISharePathType, store: any) {
	// 分享基本参数
	let strBaseUrl =
		`/pages/loading/index` + // 分享中转页
		`?fromType=PATH` + // 分享途径类型
		`&sourceID=${store.memberInfo._id ? store.memberInfo._id : ''}` + // 分享人ID
		`&sharePath=`
	// 分享路径所需参数
	let strExtendUrl = `${objParams.sharePath}?from=share`
	for (let key in objParams) {
		if (key === 'sharePath') {
			continue
		}
		strExtendUrl += `&${key}=${objParams[key]}`
	}
	return strBaseUrl + encodeURIComponent(strExtendUrl)
}

export default processSharePath
