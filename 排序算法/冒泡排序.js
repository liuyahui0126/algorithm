/**
 * 冒泡排序 
 * 相邻两元素进行比较，若后面的元素值小于前面的，进行交换。
 * 每一趟排序都将最大的元素沉淀到最后。
 * 时间复杂度 O(n^2) 最好最坏？？
 * 空间复杂度 O(1)
 */

// 双层循环处理，最多是arr.length - 1 次循环，
 function bubbleSort(arr) {
 	let len = arr.length;
 	for(let i = 0; i< len - 1; i++) {
 		let sorted = true;
 		for(let j = 0; j< len - i - 1; j++) {
 			if(arr[j] > arr[j + 1]) {
 				sorted = false;
 				const temp = arr[j];
 				arr[j] = arr[j + 1];
 				arr[j + 1] =  temp;
 			}
 		}
 		// 若本轮未进行元素交换说明已有序。不需要进行后续比较，可以直接退出本轮循环
		if (sorted) {
			break;
		}
 	}
 	return arr;
 }

// 改进点1： 有时候排序后 后半部分已经有序了 所以只需要进行前半部分数据的比较
// 记录最后一次交换位置即可
function bubbleSort1(arr) {
	let len = arr.length;
	let lastModPos = 0;
 	let sortedPos = len - 1;
 	for(let i = 0; i< len - 1; i++) {
 		let sorted = true;
 		for(let j = 0; j< sortedPos; j++) {
 			if(arr[j] > arr[j + 1]) {
 				sorted = false;
 				const temp = arr[j];
 				arr[j] = arr[j + 1];
 				arr[j + 1] =  temp;
 				// 记录最后一次的交换位置
 				lastModPos = j;
 			}
 		}
 		// 本轮结束后 记录无序区域的边界
 		sortedPos = lastModPos;
 		// 若本轮未进行元素交换说明已有序。不需要进行后续比较，可以直接退出本轮循环
		if (sorted) {
			break;
		}
 	}
 	return arr;
}