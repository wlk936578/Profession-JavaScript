/**
 * 问题遗留
 * 
 */

// 何时shiyong === 和 ==
{
	let obj = {}
	if (obj && obj.a == null) {
		// 此处相当于 obj.a === null || obj.a === undefined 写法
		// 同时判断两种状态(推荐写法)
	}
}

// Js 内置函数 作用: 均作为构造函数的作用
{
	console.log(Object)
	console.log(Array)
	console.log(Boolean)
	console.log(Number)
	console.log(Function)
	console.log(Date)
	console.log(RegExp)
	console.log(Error)
}

// JS按照存储方式区分变量类型 
{
	// 值类型 分块存在内存空间
	let a = 50
	let b = a
	a = 20
	console.log(a == b) // false
	//  引用类型 内存空间只存一份，属于变量指针的赋值
	let obj1 = {
		x: 100
	}
	let obj2 = obj1
	obj2.x = 100
	console.log('ojb2 ===> obj1', obj2.x === obj1.x) // true
}

// 如何理解JSON
// JSON 也不过是一个 JS 对象而已
// Json 也属于一种数据格式
{
	let stringToJson = JSON.stringify({
		a: 10,
		b: 20
	})
	let jsonToString = JSON.parse('{"a":10,"b":20}')
	console.log('stringToJson', stringToJson) // 字符串 转 对象
	console.log('jsonToString', jsonToString) // 对象 转 字符串
}