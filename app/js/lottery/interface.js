/**
 * 统一所有接口的类
 * 	使用的ES6语法 
 * 		1.import 模块化引用
 * 		2.class
 *    3.Promise
 * 		4.let && const
 * 		5.箭头函数(箭头函数的this指向是在定义时候的this指向，而非运行时)
 */

import $ from 'jquery'

class Interface {
	/**
	 * 获取遗漏数据
	 * @param {string} issue 当前期号
	 * @class interface
	 */
	getOmit(issue) {
		let self = this
		return new Promise((resolve, reject) => { // 获取接口后执行下一步操作
			$.ajax({
				url: '/get/omit',
				data: {
					issue
				},
				dataType: 'json',
				success: function (res) {
					// 调用其他类的方法(使用对象方法的方式传递数据避免回调处理，达到数据共享(其他class也能调用))
					self.setOmit(res.data)
					// 请求成功后用resolv接收返回数据
					resolve.call(self, res)
				},
				error: function (err) {
					reject.call(err)
				}
			})
		})
	}

	/**
	 * 获取开奖号码
	 * @param {string} issue 当前期号
	 * @class interface
	 */

	getOpenCode(issue) {
		let self = this
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/opencode',
				data: {
					issue
				},
				dataType: 'json',
				success: function (res) {
					self.setOpenCode(res.data) // 调用其他类的方法保留当前中奖号码
					resolve.call(self, res) // 请求成功后用resolv接收返回数据
				},
				error: function (err) {
					reject.call(err)
				}
			})
		})
	}

	/**
	 * 获取当前状态
	 * @param {string} issue 当前期号
	 * @class interface
	 */

	getState(issue) {
		let self = this
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '/get/state',
				data: {
					issue
				},
				dataType: 'json',
				success: function (res) {
					resolve.call(self, res) // 获取状态后进行下一步处理
				},
				error: function (err) {
					reject.call(err)
				}
			})
		})
	}
}

export default Interface