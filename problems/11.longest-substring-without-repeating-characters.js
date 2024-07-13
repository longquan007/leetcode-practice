// 题目：无重复字符的最长子串
// https://leetcode.cn/problems/longest-substring-without-repeating-characters/
// 给定一个字符串s，请你找出其中不含有重复字符的最长子串的长度。

// 示例 1:
// 输入: s = "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// 示例 2:
// 输入: s = "bbbbb"
// 输出: 1
// 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

// 示例 3:
// 输入: s = "pwwkew"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

// 思路 - 滑动窗口
// 1、初始化一个最大长度变量和两个指针
// 2、遍历的时候，每循环一次，右指针向右移动一次，当前字符如果是map中不存在的字符，就向map中存储当前字符数据并且计算一次最大长度；
// 如果当前字符存在map中，那就将左指针向右移动，继续计算最大长度，直到循环结束，输出最大长度

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let maxLength = 0;
    // 窗口左边界
    let left = 0;
    const map = new Map();

    // 右指针循环一次就向右移动一次
    for(let right = 0; right < s.length; right++) {
        // 当前字符在map中存在，且索引大于等于left 证明遇到重复字符
        if (map.has(s[right]) && map.get(s[right]) >= left) {
            // 移动left到下一个位置
            left = map.get(s[right]) + 1;
        }
        // 更新当前字符的位置
        map.set(s[right], right);
        // 更新子串最大长度
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
};

console.log(lengthOfLongestSubstring("abcabcbb"));
// console.log(lengthOfLongestSubstring("bbbbb"));
// console.log(lengthOfLongestSubstring("pwwkew"));