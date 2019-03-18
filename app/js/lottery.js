import 'babel-polyfill'
import Base from './lottery/base.js'
import Calculate from './lottery/calculate.js'
import Interface from './lottery/interface'
import Timer from './lottery/timer'
import $ from 'jquery'

// 操作多重继承 需要 深度拷贝

const copyProperties = function (target, source) {
	for (let key of Reflect.ownKeys(source)) { // 拿到原对象所有的属性
		if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
			let desc = Object.getOwnPropertyDescriptor(source, key) // 从原对象拿到函数的铭文
			Object.defineProperty(target, key, desc) // 深度拷贝
		}
	}
}

// 多重继承
const mix = function (...mixins) {
	class Mix {}
	for (let mixin of mixins) {
		copyProperties(Mix, mixin) // 拷贝将mixin 类拷贝到 Mix 类
		copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型
	}
	return Mix
}

class lottery extends mix(Base, Calculate, Interface, Timer) { // 将多个类进行合并，返回一个类拥有多重继承
	constructor(name = 'syy', cname = '11选5', issue = '**', state = '**') {
		super()
		this.name = name
		this.cname = cname
		this.issue = issue
		this.state = state
		this.el = ''
		this.omit = new Map()
		this.open_code = new Set()
		this.open_code_list = new Set()
		this.play_list = new Map()
		this.number = new Set()
		this.issue_el = '#curr_issue'
		this.countdown_el = '#countdown'
		this.state_el = 'state_el'
		this.cart_el = '.codelist'
		this.omit_el = ''
		this.cur_play = 'r5'
		this.initPlayList()
		this.initNumber()
		this.updateState()
		this.initEvent()
	}


	// 状态更新
	updateState() {
		let self = this
		this.getState().then(function (res) {
			self.issue = res.issue
			self.end_time = res.end_time
			self.state = res.state
			$(self.issue_el).text(res.issue)
			self.countdown(res.end_time, function (time) {
				$(self.countdown_el).html(time)
			}, function () {
				setTimeout(function () {
					self.updateState()
					self.getOmit(self.issue).then(function (res) {

					})
					self.getOpenCode(self.issue).then(function (res) {

					})
				}, 500)
			})
		})
	}

	// 初始化事件
	initEvent() {
		let self = this
		$('#plays').on('click', 'li', self.changePlayNav.bind(self))
		$('.boll-list').on('click', '.btn-boll', self.toggleCodeActive.bind(self))
		$('#confirm_sel_code').on('click', self.addCode.bind(self))
		$('.dxjo').on('click', 'li', self.assistHandle.bind(self))
		$('qkmethod').on('click', '.btn-middle', self.getRandomCode.bind(self))
	}
}

export default Lottery