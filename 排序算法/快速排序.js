/**
 * 快速排序 核心是分治 
 * 选择基准元素。将小于基准元素的放在左侧。大于的放在右侧。
 * 递归到每段数据长度为1表示结束
 * 时间复杂度 O(n^2) 最好最坏？？
 * 空间复杂度 O(1)
 */

function quickSort(arr) {
	var arrLen = arr.length;
	if (arrLen <= 1) {
		return arr; // 出口
	}
	var leftArr = [];
	var rightArr = [];
	var mdlValIndex = Math.floor(arrLen/2); // 选哪个都行 可以不选中间的
	var firVal = arr.splice(mdlValIndex, 1); 
	for(let i = 0; i< arrLen - 1; i++) {
		if (arr[i]< firVal) {
			leftArr.push(arr[i]);
		} else {
			rightArr.push(arr[i]);
		}
	}
	// 递归
	return quickSort(leftArr).concat(firVal, quickSort(rightArr));
}