// 题目: 两数之和
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入`只会对应一个答案`。但是，数组中同一个元素在答案里不能重复出现。
// 你可以按任意顺序返回答案。

// 示例：
// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 

// 思路一: 暴力枚举 时间复杂度 O(n^2) 空间复杂度 O(1)
// 遍历数组中的每一个数 item，在数组(剩余元素)中查找是否存在 `target - item`
// function twoSum(nums, target) {
//     for(let i = 0; i < nums.length; i++) {
//         for(let j = i + 1; j < nums.length; j++) {
//             if (nums[i] + nums[j] === target) {
//                 console.log('暴力法', [i, j]);
//                 return [i, j];
//             }
//         }
//     }
//     return null;
// }

// 思路二: 哈希表(推荐) 时间复杂度 O(n) 空间复杂度 O(n)
// 降低了时间复杂度，典型的用空间换时间

// 使用对象作哈希表
// function twoSum(nums, target) {
//     const hashTable = {};
//     for(let i = 0; i < nums.length; i++) {
//         const diff = target - nums[i];
//         if (diff in hashTable) {
//             console.log('对象 哈希表', [hashTable[diff], i]);
//             return [hashTable[diff], i];
//         }
//         hashTable[nums[i]] = i;
//     }
//     return null;
// }

// 使用map作哈希表
function twoSum(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            console.log('map 哈希表', [map.get(diff), i]);
            return [nums[i], i];
        }
        map.set(nums[i], i);
    }
    return null;
}

twoSum([1,2,8,7,11,15], 9);


// 思想: “空间换时间” 在面对寻找配对、计数、去重等问题时，考虑使用哈希表是一种常见的优化策略
// 哈希表的优点: 哈希表能够提供快速的查找、插入和删除操作，平均时间复杂度可以达到O(1)
// 使用哈希表的优势:
// 1. 减少冗余计算：通过预先存储已访问过的元素及其索引，我们可以避免像暴力解法那样进行大量的重复比较。
// 2. 定位快速：对于每一个元素，我们可以通过计算目标值与当前元素的差值，直接在哈希表中查询这个差值是否存在。如果存在，意味着我们找到了那两个数，因为它们的和正好等于目标值。这种查询操作在哈希表中是非常高效的。
// 3. 线性时间复杂度：利用哈希表，我们只需要遍历一次数组就可以解决问题，将整体的时间复杂度从暴力解法的O(n^2)降低到了O(n)，大大提高了算法的效率，特别是在处理大规模数据集时，这种效率提升会更加明显。
// 4. 空间换时间：虽然引入哈希表会增加额外的空间消耗（O(n)），但在很多实际应用中，为了获得更快的运行速度，这种空间上的牺牲是值得的，尤其是当处理大量数据或者需要高性能时。


