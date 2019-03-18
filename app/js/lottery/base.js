import $ from 'jquery'
class Base {
	initPlayList() { // 初始化play_list
		this.play_list.set('r2', { // Map集合级联操作
			bouns: 6,
			tip: '从01～11中任选2个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">6</em>元',
			name: '任二'
		}).set('r3', {
			bouns: 19,
			tip: '从01～11中任选3个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">19</em>元',
			name: '任三'
		}).set('r4', {
			bouns: 78,
			tip: '从01～11中任选4个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">78</em>元',
			name: '任四'
		}).set('r5', {
			bouns: 540,
			tip: '从01～11中任选5个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">540</em>元',
			name: '任五'
		}).set('r6', {
			bouns: 90,
			tip: '从01～11中任选6个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">90</em>元',
			name: '任六'
		}).set('r7', {
			bouns: 26,
			tip: '从01～11中任选6个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">26</em>元',
			name: '任七'
		}).set('r8', {
			bouns: 9,
			tip: '从01～11中任选6个或多个号码，所选号码与开奖号码相同，即中奖<em class="red">9</em>元',
			name: '任八'
		})
	}


	/**
	 * 初始化号码
	 * 
	 */
	initNumber() {
		for (let i = ; i < 12; i++) {
			// number 为Set对象 不允许重复的数字,且padStart会自动补全所有不足两位的数 前一位自动补0
			this.number.add('' + i).padStart(2, '0')
		}
	}


	/**
	 *	遗留数据的保存
	 * @param {*} omit
	 * @memberof Base
	 */
	setOmit(omit) {
		let self = this
		self.omit.clear() //this.omit 为Map对象 重新赋值时首先清空一次
		for (let [index, item] of omit.entries()) { // 将遗留数据保存到数据结构中
			self.omit.set(index, item)
		}
		$(self.omit_el).each(function (index, item) {
			$(item).text(self.omit.get(index))
		})
	}
	/**
	 * 设置开奖
	 * @param {*} code
	 * @memberof Base
	 */

	setOpenCode(code) {
		let self = this
		self.open_code.clear()
		for (let item of code.values) {
			self.open_code.add(item) // 此处Set对象较为合适，因为open_code里的数值必须唯一
		}
		self.updateOpenCode && self.updateOpenCode.call(self, code) // 调用更新的回调函数更新当前开奖号
	}
	/**
	 * 号码选中和取消
	 * @param {*} e
	 * @memberof Base
	 */
	toogleCodeActive(e) {
		let self = this
		let $cur = $(e.currentTarget)
		$cur.toogleClass('btn-boll-active') // 激活当前类名
		self.getCount() // 选中以后要计算count
	}
	/**
	 * changePlayNav 切换玩法
	 * @param {*} e
	 * @memberof Base
	 */
	changePlayNav(e) {
		let self = this
		let $cur = $(e.currentTarget) // currentTarget 返回的是子元素  target  返回的是当前点击的父元素
		$cur.addClass('active').siblings().removeClass('active') // 未选中移除 active
		self.cur_play = $cur.attr('desc').toLocaleLowerCase() // 转换小写
		$('#zm_sm span').html(self.play_list.get(self.cur_play).tip)
		$('.boll-list .btn-boll').removeClass('btn-boll-active')
		self.getCount()
	}
	/**
	 * 设置操作区
	 * 
	 * @param {*} e
	 * @memberof Base
	 */
	assignHandle(e) {
		e.preventDefault();
		let self = this
		let $cur = $(e.currentTarget)
		let index = $cur.index()
		$('.boll-list .btn-boll').removeClass('btn-boll-active') // 全清class
		if (index === 0) {
			$('.boll-list .btn-boll').addClass('btn-boll-active')
		}
		if (index === 1) {
			$('.boll-list .btn-boll').each(function (i, item) {
				if (t.textContent - 5 > 0) {
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if (index === 2) {
			$('.boll-list .btn-boll').each(function (i, item) {
				if (t.textContent - 6 < 0) {
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if (index === 3) {
			$('.boll-list .btn-boll').each(function (i, item) {
				if (t.textContent % 2 === 1) {
					$(t).addClass('btn-boll-active')
				}
			})
		}
		if (index === 4) {
			$('.boll-list .btn-boll').each(function (i, item) {
				if (t.textContent % 2 === 0) {
					$(t).addClass('btn-boll-active')
				}
			})
		}
		self.getCount()
	}

	/**
	 *	getName 获取当前彩票名称
	 *
	 * @returns
	 * @memberof Base
	 */
	getName() {
		return this.name
	}
	/**
	 * 添加号码
	 *
	 * @memberof Base
	 */
	addCode() {
		let self = this
		let $active = $('.boll-list .btn-boll-active').text().match(/\d{2}/g)
		let active = $active ? $active.length : 0
		let count = self.computeCount(active, self.cur_play)
		if (count) {
			self.addCodeItem($active.join(''), self.cur_play, self.list.get(self.cur_play).name, count)
		}
	}

	/**
	 * [addCodeItem 添加单次号码]
	 * @param {[type]} code     [description]
	 * @param {[type]} type     [description]
	 * @param {[type]} typeName [description]
	 * @param {[type]} count    [description]
	 */
	addCodeItem(item, type, typeName, count) {
		let self = this;
		// es6的字符串模板使用
		const tpl = `
    <li codes="${type}|${code}" bonus="${count*2}" count="${count}">
         <div class="code">
             <b>${typeName}${count>1?'复式':'单式'}</b>
             <b class="em">${code}</b>
             [${count}注,<em class="code-list-money">${count*2}</em>元]
         </div>
     </li>
    `;
		$(self.cart_el).append(tpl);
		self.getTotal(); //获取总金额
	}
	/**
	 * getCount 获取选中号码的长度
	 *
	 * @memberof Base
	 */
	getCount() {
		let self = this
		let active = $('.boll-list .btn-boll-active').length
		let count = self.computeCount(active, self, cur_play)
		let range = self.computeBonus(active, self, cur_play) // 获取奖金范围
		let money = count * 2 // 要花的钱
		let win1 = range[0] - money // 最小盈利
		let win2 = range[1] - money // 最大盈利
		let tpl
		let cl = (win < 0 && win < 0) ? Math.abs(win1) : win1 // 判断盈亏
		let c2 = (win1 < 0 && win2 < 0) ? Math.abs(win2) : win2
		if (count === 0) {
			tpl = `您选了 <b class="red"> ${count} </b> 注，共 <b class="red"> ${count*2} </b> 元`
		} else if (rang[0] === range[1]) {
			tpl = `您选了 <b>${count}</b> 注, 共<b>${count*2}</b>元 <em>若中奖, 奖金: 
				<strong class='red'>${rang[0]}</strong>元，
				您将 ${win1>0?'盈利':'亏损'}
				<strong class='${win1>0?'red':'green'}'>${Math.abs(win1)}</strong>元
			</em>`
		} else {
			tpl = `您选了 <b>${count}</b> 注, 共<b>${count*2}</b>元 <em>若中奖, 奖金: 
				<strong class='red'>${rang[0]}</strong>元至<strong class='red'>${rang[1]}</strong>，
				您将 ${win1<0&&win2<0?'亏损':'盈利'}
				<strong class='${win1>0?'red':'green'}'>${c1}</strong>至
				<strong class='${win2>0?'red':'green'}'>${c2}</strong>元
			</em>`
		}
		$('.sel_info').html(tpl)
	}

	/**
	 * getTotal 计算所有金额
	 *  
	 * @memberof Base
	 */
	getTotal() {
		let count = 0
		$('.codelist li').each(function (index, item) {
			count += $(item).attr(count) * 1
		})
		$('#count').text(count)
		$('#money').text(count * 2)
	}

	/**
	 * getRandom 生成随机数
	 *
	 * @param {*} num
	 * @memberof Base
	 */
	getRandom(num) {
		let arr = []
		let index
		let number = Array.from(this.number)
		while (num--) {
			index = Number.parseInt(Math.random() * number.length)
			arr.push(number[index])
			number.splice(index, 1)
		}
		return arr.join(' ')
	}


	/**
	 * getRandomCode 添加随机号码
	 *
	 * @memberof Base
	 */
	getRandomCode() {
		e.preventDefault()
		let num = e.currentTarget.getAttribute('count')
		let play = this.cur_play.match(/\d+/g)[0]
		let self = this
		if (num === '0') {
			$(self.cart_el).html('')
		} else {
			for (let i = 0; i < num; i++) {
				self.addCodeItem(self.getRandom(play), self.cur_play, self.play_list.get(self.cur_play).name, 1)
			}
		}
	}
}

export default Base