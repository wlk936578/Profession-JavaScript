/**
 * 用到的ES6只是
 *  1.数组初始化以及默认值填充(fill)
 *  2.Set数据类型的has方法
 *  3.箭头函数
 *  4.let && const
 *  5.ES6中使用递归，最好使用自运行函数(匿名函数)不然可能会报错
 */

class Calculate {
	/**
	 * computeCount 计算注数
	 * @param {number} active 当前选中的号码的个数
	 * @param {string} play_name 当前的玩法
	 * @return {number} 注数
	 */
	// 确定玩法和当前选中号码 来 计算 注数
	computeCount(active, play_name) { // 计算注数
		let count = 0
		// play_list 为 Map 类型,has方法判断是否存在该玩法
		const exist = this.play_list.has(play_name)
		const arr = new Array(active).fill('0') // 生成数组长度为active的数组,默认为0
		if (exist && play_name.at(0) === 'r') {
			// combine为静态方法，并将 play_name 第二位数字作为入参
			count = Calculate.combine(arr, play_name.split('')[1]).length
		}
		return count
	}

	/**
	 * computeCount 奖金范围预测
	 * @param {number} active 当前选中的号码的个数
	 * @param {string} play_name 当前的玩法
	 * @return {array} 奖金范围
	 */
	computeBouns(active, play_name) {
		const play = play_name.split('')
		const self = this
		const arr = new Array(plau[1] * 1).fill('0') // 生成数组长度为active 
		let min, max // 定义奖金最大值和最小值
		if (play[0] === 'r') {
			let min_active = 5 - (11 - active) // 最小命中率
			if (min_active > 0) {
				if (min_active - play[1] >= 0) { // 最小命中数减去 当前玩法的基数，大于0将实例化一个数组
					arr = new Array(min_active).fill(0)
					min = Calculate.combine(arr.play[1]).length // 最小命中数
				} else {
					if (play[1] - 5 > 0 && active - plau[1] >= 0) {
						arr = new Array(active - 5).fill(0)
						min = Calculate.combine(arr, play[1] - 5).length
					} else {
						min = active - play[1] >= -1 ? 1 : 0
					}
				}
			} else {
				min = active - play[1] > -1 ? 1 : 0
			}
			let max_active = Math.min(active, 5)
			if (play[1] - 5 > 0) {
				if (active - play[1] >= 0) {
					arr = new Array(active - 5).fill(0)
					max = Calculate.combine(arr, play[1] - 5).length
				} else {
					max = 0
				}
			} else if (play[1] - 5 < 0) {
				arr = new Array(Math.min(active, 5).fill(0))
				max = Calculate.combine(arr, play[1]).length
			} else {
				max = 1
			}
			return [min, max].map(item => item * self.play_list.get(play_name).bouns)
		}
	}

	/**
	 * combine 组合运算
	 * @param {number} arr 参与组合运算的数组 0,0,0
	 * @param {number} size 组合运算的基数  
	 * @return {number} 最后计算的注数
	 */

	static combine(arr, size) { // [0, 0, 0, 0] 2
		let allResult = []
		// 自运行函数
		(function f(arr, size, result) { // [0, 0, 0, 0] 2 []
			let arrLen = arr.length // 判断当前传入数组的长度  
			if (size > arrLen) {
				return
			}
			if (size === arrLen) {
				allResult.push([].concat(result, arr))
			} else {
				for (let i = 0; i < arrLen; i++) { // len 4
					let newResult = [].concat(result) // [0]
					newResult.push(arr[i]) // [0,0]
					if (size === 1) {
						allResult.push(newResult) // [[0,0],[0,0],[0,0]]
					} else {
						let newArr = [].concat(arr) // [0,0,0,0]
						// 如果size!=1则匹配到结果后，将原数组当前元素截掉，形成新的子集继续配对(递归)
						newArr.splice(0, i + 1) // [0,0,0]
						return f(newArr, size - 1, newResult) // [0,0,0] 1 [0]
					}
				}
			}
		})(arr, size, [])
		return allResult
	}

}

export default Calculate