// 题目：三数之和
// https://leetcode.cn/problems/3sum/description/
// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
// 你返回所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。

// 示例 1：
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]
// 解释：
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
// 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
// 注意，输出的顺序和三元组的顺序并不重要。

// 示例 2：
// 输入：nums = [0,1,1]
// 输出：[]
// 解释：唯一可能的三元组和不为 0 。

// 示例 3：
// 输入：nums = [0,0,0]
// 输出：[[0,0,0]]
// 解释：唯一可能的三元组和为 0 。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum(nums) {
    // 数组排序，便于后续去重，简化查找
    nums.sort((a, b) => a - b);
    const result = [];

    for(let i = 0; i < nums.length - 1; i++) {
        // 以nums[i]为锚点，使用双指针进行查找

        // 跳过重复元素
        // i > 0 是为了防止nums[i - 1]越界
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        // 只需要遍历到一半的位置即可，避免无效操作
        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            // 和小于0，左指针右移
            if (sum < 0) {
                left++;
            }
            // 和大于0，右指针左移
            else if (sum > 0) {
                right--;
            } else {
                result.push([nums[i], nums[left], nums[right]]);
                // 左指针移动去重
                while(left < right && nums[left] === nums[left + 1]) left++;
                // 右指针移动去重
                while(left < right && nums[right] === nums[right - 1]) right--;
                // 匹配到结果之后，左右指针都向中间靠拢
                left++;
                right--;
            }
        }
    }
    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));
console.log(threeSum([0,1,1]));
console.log(threeSum([0,0,0]));