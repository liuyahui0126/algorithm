/**
 * 归并排序 核心其实也是一种分治的思想 
 * 基于合并两个有序子序列, 定义两个指针表示当前遍历元素的位置
 * 循环比较, 直到一个数组循环结束
 * 将另一个数组的剩余值直接拼接在最后, 得到排序后的数组
 * 时间复杂度 O(n^2) 最好最坏？？
 * 空间复杂度 O(1)
 */

function mergeArr(arr1, arr2) {
	// 定义两个指针表示当前遍历元素的位置
	var index1 = 0;
	var index2 = 0;
	var arr = []; // 生成新数组
	while(index1< arr1.length && index2< arr2.length) {
		if (arr1[index1] <= arr2[index2]) {
			arr.push(arr1[index1]);
			index1++;
		} else if (arr1[index1] > arr2[index2]){
			arr.push(arr2[index2]);
			index2++;
		}
	}
	// 将剩余的数据拼接在最后
	if (index1 < arr1.length) {
		arr.push(...arr1.slice(index1));

	}
	if (index2 < arr1.length) {
		arr.push(...arr2.slice(index2));
	}
	return arr;
}