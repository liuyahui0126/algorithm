/**
 * cacheRequest 请求缓存模拟
 * 控制在一个系统中多次发出同一个请求 在network中只显示一个 不重复发请求
 * 核心是利用缓存的概念，模拟实现一个本地缓存机制
 * 默认request() 是一个经过promise封装的请求方法 不需要自己实现
 */

/**
 * 简化版 不考虑pending状态 
 */

// 定义一个本地缓存
var cacheMap = new Map();

// 封装请求
function handleRequest(url) {
	// 获取缓存数据
	if(cacheMap.has(url)) {
		return Promise.resolve(cacheMap.get(url));
	} else {
		request(url).then(res => {
			cancheInfo.set(url, res);
			return res;
		}).catch(err => {
			Promise.reject(err);
		})
	}
}

/**
 * 升级版 考虑pending状态
 * 当请求处于pending的时候 设计status保存当前状态 后续请求若查询到之前是pending的则封装成异步队列 不重复发送请求
 * 当请求成功返回后 将数据广播到异步队列的resolve中（resolveArr）
 * 当请求失败返回后 将错误信息广播到异步队列的reject中（rejectArr）
 * 之后的请求正常取响应结果
 */

// 这时候就不能用简单的返回结果存入map中 需要加上每个请求的返回状态和成功失败队列
// {
//		status: '',
//		response: {},
//		resolveArr: [],
//		rejectArr: []
// }

// 定义一个本地缓存
var cacheMap = new Map();

// 封装缓存请求 传入一个option 灵活获取cacheKey 
function cacheRequest(url, option = {}) {
	const cacheKey = option.cacheKey || url;
	// 获取缓存数据
	const cacheInfo = cacheMap.get(cacheKey);
	// 判断是否有缓存
	if (!cacheMap.has(cacheKey)) {
		return handleRequest(url, cacheKey);
	}

	const status = cacheInfo.status;
	// 已成功返回数据 直接返回缓存数据
	if (status === 'SUCCESS') {
		return Promise.resolve(cacheInfo.response);
	}

	// 若请求处于pending状态需将请求封装成异步操作，加入队列
	if (status === 'PENDING') {
		return new Promise((resolve, reject) => {
	      cacheInfo.resolves.push(resolve)
	      cacheInfo.rejects.push(reject)
	    })
	}

	// 缓存的请求失败时 重新发出请求
	return handleRequest(target, cacheKey);
}

// 简单写一个setCache的方法 主要目的在于status改变时 改变cacheInfo的信息
function setCache(cacheKey, info) {
	cacheMap.set(cacheKey, {
		...(cacheMap.get(cacheMap) || {}),
		...info
	})
}

// 封装真实请求
function handleRequest(url, cacheKey) {
	// 初始化申请缓存区域
	setCache(cacheKey, { 
		status: 'PENDING',
		resolves: [],
		rejects: []
	});

	return request(url).then(res => {
		setCache(cacheKey, { 
			status: 'SUCCESS',
			response: res
		});
		// 广播成功返回数据
		notify(cacheKey, res);
		return Promise.resolve(res);
	}).catch(err => {
		setCache(cacheKey, { 
			status: 'FAILURE'
		});
		// 广播失败的错误信息
		notify(cacheKey, err);
		return Promise.reject(err);
	})
}

// 模拟广播函数
function notify(cacheKey, info) {
	const cacheInfo = cacheMap.get(cacheKey);

	let queue;
	if (cacheInfo.status ===  'SUCCESS') {
		queue = cacheInfo.resolveArr;
	} else {
		queue = cacheInfo.rejectArr;
	}

	while(res.length) {
		const cb = queue.shift();
		cb(info);
	}

	// 在最后清空待处理的队列即可
	setCache(cacheKey, { resolves: [], rejects: [] });
}











