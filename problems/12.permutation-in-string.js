// 题目：字符串的排列
// https://leetcode.cn/problems/permutation-in-string/
// 给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
// 换句话说，s1 的排列之一是 s2 的 子串 。

// 示例 1：
// 输入：s1 = "ab" s2 = "eidbaooo"
// 输出：true
// 解释：s2 包含 s1 的排列之一 ("ba").

// 示例 2：
// 输入：s1= "ab" s2 = "eidboaoo"
// 输出：false

// 提示：s1 和 s2 仅包含小写字母

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    let s1Len = s1.length, s2Len = s2.length;

   // s1长度大于s2,直接返回false
   if (s1Len > s2Len) return false;

   // 初始化数组，存储字母出现的次数
   const cnt1 = new Array(26).fill(0);
   const cnt2 = new Array(26).fill(0);

   // 使用一个长度为26的数组，按数组索引存储对应26个字母出现的次数
   // 先取s1字符串长度的对应数组
   for(let i = 0; i < s1Len; i++) {
       ++cnt1[s1[i].charCodeAt() - 'a'.charCodeAt()];
       ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
   }

   // 数组数字相同，s1是s2的子串
   if (cnt1.toString() === cnt2.toString()) {
       return true;
   }

   // 取s2中长度等于s1的部分，采用滑动窗口思路依次比较s1是s2子串的可能行
   for(let i = s1Len; i < s2Len; ++i) {
       // 右边界扩张
       ++cnt2[s2[i].charCodeAt() - 'a'.charCodeAt()];
       // 左边界收缩
       --cnt2[s2[i - s1Len].charCodeAt() - 'a'.charCodeAt()];

       if (cnt1.toString() === cnt2.toString()) {
           return true;
       }
   }

   return false;
};

// console.log(checkInclusion("ab", "eidbaooo"));
console.log(checkInclusion("ab", "eidboaoo"));