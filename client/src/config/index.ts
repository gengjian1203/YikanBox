const prod = true // true-线上环境 false-测试环境

export const config = {
	env: prod ? 'online-z8369' : 'develop-0loik',
	cloudPath: prod
		? 'cloud://online-z8369.6f6e-online-z8369-1259256375/resource'
		: 'cloud://online-z8369.6f6e-online-z8369-1259256375/resource',
	cloudPathQRCode: prod
		? 'cloud://online-z8369.6f6e-online-z8369-1259256375/'
		: 'cloud://online-z8369.6f6e-online-z8369-1259256375/',
}

export default config
