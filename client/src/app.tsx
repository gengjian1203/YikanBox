import React, { Component } from 'react'
import { Provider } from 'react-redux'

import configStore from '@/redux/store'

import './app.scss'
import './scss/iconfont.scss'
import './scss/custom-variables.scss' // 改变taro-ui的默认样式

const store = configStore()

class App extends Component {
	componentDidMount() {}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return <Provider store={store}>{this.props.children}</Provider>
	}
}

export default App
