import {
	type
} from "os";

/**
 * 知识点:
 *  1.变量类型: 1.值类型 2.引用类型
 *  2.变量计算
 */

// 值类型
{
	var a = 100
	var b = a
	a = 200
	console.log(b) // 100  值类型不会引用之前赋值的变量
}

// 引用类型
{
	var a = {
		age: 20
	}
	var b = a
	b.age = 21
	console.log(a.age) // 引用类型 相互引用，b.age改变，a.age会随着变化
}

/**
 * 从内存上来说，值类型是把每个值都存放在 对应变量内存的位置
 * 
 * 引用类型 则是 把 a 分成对象，对象本身存在另一个位置，而 a内存的位置 		 则是通过指针
 * 指向这个位置，而b也是被定义后，它的指针也指向了对象相同的位置
 * 此时 {age:20} 仅有一份儿对象，如果b改变了原本对象的值，那么同样
 * a指向的同一个对象自然会有变化，此处并没有单独进行拷贝
 * 之所以这么设计。也是为了合理的利用空间，如果分别特别大两个变量各拷贝一份对象
 * 那么内存占用量会急剧增加，这样做是不合理的
 * 
 */

// typeof 运算符 注意:typeof 只能区分 值类型 的详细类型
{
	// 值类型
	console.log(typeof undefined) // undefined
	console.log(typeof 'abc') // string
	console.log(typeof 123) // number
	console.log(typeof true) // boolean
	// 引用类型
	console.log(typeof {}) // object
	console.log(typeof []) // object
	console.log(typeof null) // object 定义了位置，却没有指向任何真实的引用类型的 空指针
	console.log(typeof console.log) // function 函数是一种非常特殊的引用类型，需要特别区分
}

// 变量计算 --强制类型转换
// 可能发生强制类型转换的 有4种 
// 1.字符串拼接 2.==运算符 3.if语句 4.逻辑运算
{
	// 字符串拼接
	let a = 100 + 10 // 110
	let b = 100 + '10' // 10010 数字碰到字符串会强制转换成字符串
	let c = '10' + 100 // 10100
	console.log('a', a)
	console.log('b', b)
	console.log('c', c)
}

{
	// 双等运算符
	console.log(100 == '100') // true 100会转换成 字符串类型
	console.log(0 == '') // true 0 和 '' 都会转换成 false boolean类型
	console.log(null == undefined) // true 同上，会转换成false
} {
	// if语句
	let a = true
	if (a) {
		// ....
	}
	let b = 100
	if (b) { // 直接将 100 转换成 boolean 类型
		// ...
	}
	let c = ''
	if (c) { // '' 转成 noolean类型为 false
		// ...
	}
}

{
	// 逻辑运算符
	console.log(18 && 0) // 0 && 运算符 将10 转成 true ，则打印 0
	console.log('' || 'abc') // 'abc' 空字符串 转成false 'abc' 为 true，打印'abc'
	console.log(!window.abc) //  !运算符将 window.abc 转成 undefined 则!undefined 结果为true

	// 判断一个变量 会被当做 true 还是 false 
	let a = 100
	console.log(!!a) // !!强制转换成 boolean 类型
	// 即 !a 为false, !!a 则为true
}