// 题目：有效的括号 
// https://leetcode.cn/problems/valid-parentheses/description/
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：
// 1.左括号必须用相同类型的右括号闭合。
// 2.左括号必须以正确的顺序闭合。
// 3.每个右括号都有一个对应的相同类型的左括号。


// 示例 1：
// 输入：s = "()"
// 输出：true

// 示例 2：
// 输入：s = "()[]{}"
// 输出：true

// 示例 3：
// 输入：s = "(]"
// 输出：false

// function isValid(s) {
// 	const charMap = {
// 		')': '(',
// 		']': '[',
// 		'}': '{'
// 	};

// 	let stack = [];

// 	for(let char of s) {
// 		// 左括号
// 		if (Object.values(charMap).includes(char)) {
// 			stack.push(char);
// 		} 
// 		// 右括号
// 		else if (char in charMap) {
// 			// 第一个有括号匹配的是空栈或者栈顶元素不是匹配的括号
// 			if (!stack.length || stack.pop() !== charMap[char]) {
// 				return false;
// 			}
// 		} 
// 		// 异常处理
// 		else {
// 			throw Error('Invalid character encountered');
// 		}
// 	}
// 	// stack 内无数据才是有效括号
// 	return stack.length === 0;
// }

function isValid(s) {
    let stack = [];

    let char = '';
    for(let i = 0; i < s.length; i++) {
        char = s[i];
        // 遇到左括号就向stack中压入一个对用的右括号
		// 遇到右括号，就取栈顶字符与其对比，不相等则不是有效括号
        switch(char) {
            case '(':
                stack.push(')');
                break;
            case '[':
                stack.push(']');
                break;
            case '{':
                stack.push('}');
                break;
            default:
                if (stack.pop() !== char) {
                    return false;
                }
        }
    }
    // 循环结束 栈为空则是有效括号
    return stack.length === 0;
}

console.log(isValid("()[]{}"));