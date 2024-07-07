// 题目：验证回文字符串
// https://leetcode.cn/problems/valid-palindrome/
// 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
// 字母和数字都属于字母数字字符。
// 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。

// 示例 1：
// 输入: s = "A man, a plan, a canal: Panama"
// 输出：true
// 解释："amanaplanacanalpanama" 是回文串。

// 示例 2：
// 输入：s = "race a car"
// 输出：false
// 解释："raceacar" 不是回文串。

// 示例 3：
// 输入：s = " "
// 输出：true
// 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
// 由于空字符串正着反着读都一样，所以是回文串。

// 思路 - 过滤 + 判断
// 1、对输入的字符串先过滤掉非字母数字字符，再转成小写
// 2、判断处理后的字符串是否是回文字符串(逆序字符串判断、双指针判断)

// 逆序字符串
// function isPalindrome(s) {
//     // 过滤掉非字母数字字符，再转成小写
//     const filterS = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
//     // 逆序字符串
//     const reversedS = filterS.split('').reverse().join('');
//     // 判断两者是否相等
//     return filterS === reversedS;
// }

// 双指针
function isPalindrome(s) {
    // 过滤掉非字母数字字符，再转成小写
    const filterS = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    // 根据回文字符串的特点只需要遍历一半的数据即可
    // for (let i = 0; i < filterS.length; i++) {
    //     if (i < filterS.length - 1 - i && filterS[i] !== filterS[filterS.length - 1 - i]) {
    //         return false;
    //     }
    // }
    for (let i = 0; i < filterS.length / 2; i++) {
        if (filterS[i] !== filterS[filterS.length - 1 - i]) {
            return false;
        }
    }
    return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
console.log(isPalindrome(" "));