/**
 * 倒计时模板
 *  所用知识点: 
 *   1.const 和 let 
 *   2.字符串模板 
 *   3.class类
 */

class Timer {
	countdown(end, update, handle) { // handle为回调
		const now = new Date().getTime() // 获取当前时间
		const self = this // 获取当前对象的指针
		if (now - end > 0) {
			handle.call(self) // 执行倒计时后的回调
		} else {
			let last_time = end - now // 剩余时间
			const px_d = 1000 * 60 * 60 * 24 // 设计一个常量作为一天所需要的时间
			const px_h = 1000 * 60 * 60 // 一小时时间
			const px_m = 1000 * 60 // 一分钟
			const px_s = 1000 // 一秒

			// 格式化剩余时间
			let d = Math.floor(last_time / px_d)
			let h = Math.floor((last_time - d) / px_h)
			let m = Math.floor((last_time - d * px_d - px_h * h) / px_m)
			let s = Math.floor((last_time - d * px_d - px_h * h - px_m * m) / px_s)
			let r = []

			// 用字符串模板编译格式化之后的结果
			if (d > 0) {
				r.push(`<em>${d}</em>天`)
			}
			if (r.length || (h > 0)) {
				r.push(`<em>${h}</em>时`)
			}
			if (r.length || (m > 0)) {
				r.push(`<em>${m}</em>分`)
			}
			if (r.length || s > 0) {
				r.push(`<em>${s}</em>?`)
			}
			self.last_time = r.join('')
			update.call(self, r.join('')) //完成当前的更新
			setTimeout(() => {
				return self.countdown(end, update, handle) // 重新执行倒计时
			}, 1000);
		}
	}
}

export default Timer