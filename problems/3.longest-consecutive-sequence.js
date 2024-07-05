// 题目: 最长连续序列 
// https://leetcode.cn/problems/longest-consecutive-sequence/description/
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 示例 1：
// 输入：nums = [100,4,200,1,3,2]
// 输出：4
// 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

// 示例 2：
// 输入：nums = [0,3,7,2,5,8,4,6,0,1]
// 输出：9
 
// 提示：
// 0 <= nums.length <= 104
// -109 <= nums[i] <= 109

// 进阶：可以设计并实现时间复杂度为 O(n) 的解决方案吗？

// 解题思路
// 1. 去重与排序：首先，我们需要去除数组中的重复元素并对其进行排序。这是因为连续序列的元素在排序后会相邻，且去重可以避免重复计算同一个数字。
// 2. 遍历排序后的数组：然后，遍历排序后的数组，逐个检查每个数字是否可以延伸出一个更长的连续序列。这里的关键在于，对于当前数字，如果它与前一个数字相差1，则说明它可以加入到当前的连续序列中；否则，它应该被视为新序列的起始点。
// 3. 记录最长序列长度：在遍历过程中，不断更新最长连续序列的长度。并在遍历结束后返回这个长度

// 思路1 - 枚举
// 1、"不要求序列元素在原数组中连续" 即需要考虑对原数组进行排序 + 去重(易漏)，顺序可以先去重再排序
// 2、对去重排序后的数组遍历，找出所有连续序列的长度取最大值即可
// function longestConsecutive(nums) {
//     // 处理特殊情况
//     if (nums.length === 0) return 0;

//     // 对数组进行去重与排序
//     const uniqueNums = [...new Set(nums)].sort((a, b) => a - b);

//     let maxLength = 0;
//     let currentLength = 1; // 当前序列长度最少为1

//     for(let i = 0; i < uniqueNums.length; i++) {
//         // 这种判断方法需在for循环之外再判断一次 
//         // 好处: 不需要对for循环的最大值数进行操作
//         // if (uniqueNums[i] === uniqueNums[i-1] + 1) {
//         //     currentLength++;
//         // } else {
//         //     maxLength = Math.max(maxLength, currentLength);
//         //     currentLength = 1;
//         // }

//         // uniqueNums[i+1]会溢出数组取值范围，利用这个判断完所有的字符串
//         // 不想改成写法一的判断方式 又不想溢出取值范围的话 =>
//         // 需要将for循环的最大值设置成`数组长度-1` 并且也需要在for循环外层再判断一次 maxlength 与 currentLength
//         // 详细参考下一个方法
//         if (uniqueNums[i] + 1 === uniqueNums[i+1]) {
//             currentLength++;
//         } else {
//             maxLength = Math.max(maxLength, currentLength);
//             currentLength = 1;
//         }
//     }

//     // 注释写法需在这里再次判断下
//     // maxLength = Math.max(maxLength, currentLength);

//     return maxLength;
// }

// function longestConsecutive(nums) {
//     if (nums.length === 0) return 0;

//     const uniqueNums = Array.from(new Set(nums)).sort((a, b) => a - b);

//     let maxLength = 0;
//     let currentLength = 1;

//     for(let i = 0; i < uniqueNums.length - 1; i++) {
//         if (uniqueNums[i] + 1 === uniqueNums[i+1]) {
//             currentLength++;
//         } else {
//             maxLength = Math.max(maxLength, currentLength);
//             currentLength = 1;
//         }
//     }

//     // 取值不越界的情况下，都需要在for循环外层再判断一次
//     maxLength = Math.max(maxLength, currentLength);

//     return maxLength;
// }

// 思路2 - 哈希表
// 1. 数组转set去重
// 2. 遍历set，避免一些不必要的枚举，"跳过非连续序列开始的项"，即从不存在x-1的x开始枚举[跳过]
// 3. 若不存在 num-1 则将其当成序列开始，开启while循环，在set中寻找是否存在 currentNum+1，存在的话当前序列长度currentLength++，currentNum++;不存在则循环结束，与maxLength比较取大的
function longestConsecutive(nums) {
    const set = new Set(nums);

    let maxLength = 0;

    for(const num of set) {
        if (!set.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;

            while(set.has(currentNum + 1)) {
                currentLength++;
                currentNum++;
            }

            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}

console.log(longestConsecutive([100,4,200,1,3,2]));
// console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1]));