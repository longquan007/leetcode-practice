// 题目: 字母异位词分组
// https://leetcode.cn/problems/group-anagrams/
// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
// 简单来说 若字符串 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词

// 示例1：
// 输入：strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出：[["bat"],["nat","tan"],["ate","eat","tea"]]
//  "ate" "eat" "tea" 是一组字母异味词

// 示例2：
// 输入：strs = [""]
// 输出：[[""]]
// 特殊情况

// 示例2：
// 输入：strs = ["a"]
// 输出：[["a"]]
// 特殊情况

//解题思路：
// 1. 理解字母异位词的本质：两个字符串是字母异位词，意味着它们包含相同的字符，只是字符的顺序不同。这意味着，如果我们对两个字符串的字符进行排序，排序后的结果应该是相同的。
// 2. 选择合适的数据结构：为了方便分组，我们可以使用哈希表，其中键（key）是排序后的字符串，值（value）是一个数组，存放所有构成该字母异位词的原始字符串。
function groupAnagrams(strs) {
    const hashTable = {};
    for(const str of strs) {
        const temp = str.split('').sort().join('');
        if (temp in hashTable) {
            hashTable[temp].push(str);
        } else {
            hashTable[temp] = [str];
        }
    }
    return Object.values(hashTable);
}

// function groupAnagrams(strs) {
//     const anagramMap = new Map();
//     for(const str of strs) {
//         const sortedStr = str.split('').sort().join('');
//         if (anagramMap.has(sortedStr)) {
//             // anagramMap.set(sortedStr, anagramMap.get(sortedStr).concat(str));
//             anagramMap.get(sortedStr).push(str);
//         } else {
//             anagramMap.set(sortedStr, [str]);
//         }
//     }
//     console.log('values', anagramMap.values());
//     console.log('Array', Array.from(anagramMap.values()));
//     // 使用map最后一步需要从map.values中获取
//     return Array.from(anagramMap.values());
// }

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));