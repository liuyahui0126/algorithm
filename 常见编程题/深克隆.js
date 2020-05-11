/**
 * 深克隆
 * 对于对象的一个深层次克隆， 主要核心在于对对象内部的引用值的克隆
 * 避免两个对象之间属性的相互影响
 */

function deepClone(target) {
 	if (typeof target !== 'object') {
		return target;
	}
	const newObj = Array.isArray(target) ? [] : {};
	Object.keys(target).map(key => {
		if (typeof target[key] === 'object') {
			newObj[key] = deepClone(target[key]);
		} else {
			newObj[key] = target[key];
		}
		if (key === 'test') {console.log('error')}
	})
	// for(key in target) {
	// 	// 去掉原型链属性
	// 	if(!target.hasOwnProperty(key)) {
	// 		continue;
	// 	}
	// 	if (typeof target[key] === 'object') {
	// 		newObj[key] = deepClone(target[key]);
	// 	} else {
	// 		newObj[key] = target[key];
	// 	}
	// 	if (key === 'test') {console.log('error')}
	// }
	return newObj;
}


// 进阶版 - 注意特殊对象的拷贝 Set/正则/日期/null等
// hash主要是在解决循环引用的问题 map可以用不只是string的数据作为key 并且weakmap是可以被垃圾回收机制回收的
function deepClone(obj, hash = new WeakMap()) {
	// 前置类型校验
    if (Object(obj) !== obj) return obj;
    // 特殊Set类型属于object
    if (obj instanceof Set) return new Set(obj);
    // 解决循环引用的问题
    if (hash.has(obj)) return hash.get(obj); 
    // 核心 - 进行各种对象数据的拷贝
    const result = obj instanceof Date ? new Date(obj)
        : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
        : obj.constructor ? new obj.constructor()
        : Object.create(null);

    // 将数据插入weakMap中
    hash.set(obj, result);

    // 对于Map结构 对象中非引用数据进行复制 引用数据递归处理
    if (obj instanceof Map) {
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)));
    }

    // 常规数据的处理
    return Object.assign(result, ...Object.keys(obj).map (
        key => ({[key]: deepClone(obj[key], hash)})
    ));
}




