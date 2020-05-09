/**
 * 数组去重 
 * 方法很多但是都大同小异 在此列举几个个人常用的方法
 */

// 1. 使用set 不能去重NaN 和 {}
var newArr = [...new Set(arr)];

// 2. 利用reduce 和 includes 不会去重{} 
function unqinue(arr) {
	return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], [])
}

// 3. 升级1 去重{}
function unqinue(arr) {
	var newArr = [];
	arr.reduce((prev, cur) => {
		if (prev.includes(typeof cur + cur)) {
			return prev;
		} else {
			newArr.push(cur);
			return [...prev, typeof cur + cur];
		}
	}, [])
	return newArr;
}
