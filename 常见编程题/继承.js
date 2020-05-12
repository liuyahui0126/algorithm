/**
 * 继承
 * 一个函数继承另一个函数的属性和方法 以及他原型上的属性方法
 */


/**
 * 1. 原型链逐步继承 
 * 继承了过多的无用属性和方法
 * 无法实现多继承
 * 子类实例共享一个父类引用属性
 */

/**
 * 2. 借用构造函数
 * 缺点：。
 * 每次构造函数都要多走一个函数 无法实现复用 浪费资源
 */
function Car() {
	this.a = 19;
}

var bmw = new Car();


/**
 * 3. 共享原型
 * 缺点：
 * 父子都指向同一块内存区域 会互相影响
 */
function Father(){}
a.prototype.myFun = () => {console.log(123)}
function Son(){}
b.prototype = a.prototype;


/**
 * 4. 圣杯继承
 * 利用缓存 和new的内部转化 解决共享原型的问题
 */
function inherit(target, origin) {
	function Cache() {}
	Cache.prototype = origin.prototype;
	target.prototype = new Cache();
	target.prototype.constructor = target; // target的constructor归位
	target.prototype.uber = origin.prototype; // 信息储备，想知道继承自谁，先记录下来


// 进阶版：利用闭包将Cache保存到外部 
// 立函执行前预编译产生的AO在立函执行完毕后并不会销毁
// 于是Cache作为闭包赋予到inherit函数中去了 
// 通过这种方式不会每次都新建一个Cache 而是一直在使用同一个Cache
var inherit = (function(){
  var Cache = function(){};
  return function (Target, Origin){
    Cache.prototype = Origin.prototype;
    Target.prototype = new Cache();
    Target.prototype.constuctor = Target;
    Target.prototype.uber = Origin.prototype;
  }
}())