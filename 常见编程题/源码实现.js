/**
 * 一些常见的js方法的模拟实现
 */

// 1. typeof模拟
function getType(val) {
	var template = {
		'[object Array]': 'array',
		'[object Object]': 'object',
		'[object Symbol]': 'symbol',
		'[object Number]': 'number',
		'[object Bollean' : 'bollean',
		'[object String]' : 'string',
		'[object Error]' : 'error',
		'[object Null]': 'null'
	};
	var temp =  Object.prototype.toString.call(val);
	return template[temp] || 'Parse Error';
}

// 2. 实现call、apply、bind 
/**
 * call 直接执行
 * 参数不限制 第一个表示this指向 后面的表示需要传入函数的参数列表
 * function.call(thisArg, arg1, arg2, arg3, ...)
 * 我这里采用es6语法解析参数 
 */
Function.prototype.mycall = function (...[context, ...args]) {
    var context = context || window;
    // 将函数暂存在context.fn中
    context.fn = this;
    var result = context.fn(args);

    // 函数执行之后删除context.fn
    delete context.fn
    return result;
}

/**
 * apply 直接执行
 * 两个参数 第一个表示this指向 第二个表示入参数组
 * function.apply(thisArg, [arg1, arg2, arg3, ...])
 */
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
    	// 优化点： 将参数arr进行字符串arr[0]的转化 在后面便于eval执行函数的解析
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

/**
 * bind 不直接执行 返回一个闭包的函数
 * 两个参数 第一个表示this指向 第二个表示入参数组
 * function.bind(thisArg, [arg1, arg2, arg3, ...])
 */
Function.prototype.mybind = function (...[context, ...args]) {
	let self = this;
	// 利用圣杯继承 继承原型链上的属性
	function TempFun(){}
	TempFun.prototype = this.prototype;
	function bond(...ars){
		const thisContext = this instanceof TempFun ? this : context;
		const params = [...args, ...ars];
		return self.apply(thisContext, params);
	};
	bond.prototype = new TempFun();
	return bond;
}

/**
 * 3. 利用两个堆模拟队列
 * 模拟push、pop两个事件
 */
var originArr = [];
var targetArr = [];
function Push(...node){
	console.log(node);
	if (node) {
		originArr.push(node);
		if (node.length === 1) {
			targetArr.unshift(node);
		} else {
			node.map(item => {
				targetArr.unshift(item);
			})
		}
		return targetArr.length;
	}
	return 0;
}

function pop(){
	originArr.shift();
	targetArr.pop();
	return targetArr.length;
}

/**
 * 4. 实现new
 * 开辟内存空间，创建新的对象
 * 改变this指向
 * 继承原型上的属性方法
 */
function _new(fn, ...args){
	if (!(fn && typeof fn === "function")) {
		return;
	}
	var obj = Object.create(fn.prototype);
	fn.apply(obj, args);
	return obj;
}
function originFn(p){
	this.a = 10;
	this.b = 11;
};
originFn.prototype.name = 'ceshi';
var newF = _new(originFn, 100, 200);
