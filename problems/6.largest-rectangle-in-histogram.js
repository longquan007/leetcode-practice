// 题目：柱状图中最大的矩形
// https://leetcode.cn/problems/largest-rectangle-in-histogram/description/
// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。

// 示例 1:
// 输入：heights = [2,1,5,6,2,3]
// 输出：10

// 示例 2：
// 输入： heights = [2,4]
// 输出： 4

// 示例不理解，可以参考leetcode连接，有示例图参考

// 思路 - 个人想法 (以为只考虑相邻元素围成矩形的最大面积，题意理解有误)
// var largestRectangleArea = function(heights) {
//     if (heights.length === 1) {
//         return heights[0];
//     }
//     let maxArea = 0;
//     for(let i = 0; i < heights.length; i++) {
//         for(let j = i+1; j < heights.length; j++) {
//             if (i + 1 === j) {
//                 if (!heights[i] && !heights[j]) {
//                     console.log('000', i, j);
//                     return 0;
//                 } else if (!heights[i] || !heights[j]){
//                     maxArea = Math.max(Math.max(heights[i], heights[j]), maxArea);
//                 } else if (heights[i] && heights[j]){
//                     maxArea = Math.max(2 * Math.min(heights[i], heights[j]), maxArea);
//                 }
//             }
//         }
//     }
//     return maxArea;
// };

// 思路1 - 单调栈法（推荐，高效）
// 为什么想到用这种方法？
// 单调栈法之所以被想到，是因为它能够高效地处理当前柱子与其左右两边柱子高度的比较关系，
// 利用栈的特性（后进先出）来快速确定每个柱子作为矩形高度时的左右边界。
// 这种方法特别适合处理与顺序相关且需要快速检索“最近的特定条件”的问题。

// 具体步骤：
// 1、初始化一个栈，栈中存放柱子的索引而非高度，栈底放置一个哨兵（索引为-1），用于简化边界处理。
// 2、从左到右遍历柱状图数组，对于每个柱子，如果它比栈顶柱子高，直接入栈；如果它比栈顶柱子矮或等于，就不断弹出栈顶元素，计算以弹出柱子为高度、以其索引到当前柱子索引为宽度的矩形面积，并更新最大面积。
// 3、遍历完成后，栈中剩余的柱子也要按照同样的逻辑处理，确保所有可能性都被考虑。

/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    let maxArea = 0;
    let stack = [-1]; // 哨兵，简化边界处理
    heights.push(0); // 保证最后所有元素出栈

    for (let i = 0; i < heights.length; i++) {
        // 当遇到比栈顶元素对应柱子矮的柱子时，计算栈顶元素对应的矩形面积
        while (heights[i] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop()];
            let width = i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i); // 当前柱子索引入栈
    }

    return maxArea;
}


// 思路2 - 动态规划法（较慢，但直观）
// 为什么想到用这种方法？
// 动态规划法是基于问题的重叠子问题特性和最优子结构。尽管不是典型的动态规划问题，但我们可以从每个柱子出发，考虑以它为中心，向两边扩展的最远边界，这个过程可以视为在解决一系列重叠的子问题。
// 可以在做完 一维DP 相关的题目后再回看。

// 具体步骤：
// 1、初始化辅助数组：我们创建两个数组 leftMinIndex 和 rightMinIndex，分别记录每个柱子左侧和右侧第一个比它矮的柱子的索引。初始化时，每个柱子的左右索引都设为自己。
// 2、计算左侧边界：从左到右遍历柱子，更新每个柱子的 leftMinIndex，如果当前柱子比栈顶柱子矮，就更新栈顶柱子的 leftMinIndex 为当前柱子的索引，并将当前柱子入栈。
// 3、计算右侧边界：从右到左遍历柱子，同样更新每个柱子的 rightMinIndex，注意这里是反向的，所以如果当前柱子比栈顶柱子矮，就更新栈顶柱子的 rightMinIndex 为当前柱子的索引，并将当前柱子入栈。
// 4、计算最大矩形面积：遍历每个柱子，利用 leftMinIndex 和 rightMinIndex 计算以当前柱子为底的矩形面积，更新最大面积。

function largestRectangleArea(heights) {
    const n = heights.length;
    let leftMinIndex = new Array(n).fill(0), rightMinIndex = new Array(n).fill(n);
    let stack = [];

    // 计算左侧边界
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
            stack.pop();
        }
        leftMinIndex[i] = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
        stack.push(i);
    }

    stack = []; // 重置栈用于计算右侧边界

    // 计算右侧边界，注意这里是从 n-1 开始倒序遍历
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
            stack.pop();
        }
        rightMinIndex[i] = stack.length === 0 ? n : stack[stack.length - 1];
        stack.push(i);
    }

    // 计算每个柱子能形成的最大矩形面积
    let maxArea = 0;
    for (let i = 0; i < n; i++) {
        maxArea = Math.max(maxArea, (rightMinIndex[i] - leftMinIndex[i]) * heights[i]);
    }

    return maxArea;
}

// 思路3 - 分治法（递归）
// 为什么想到用这种方法？
// 分治法是将大问题分解为相似的子问题，递归解决，合并结果。在“柱状图中的最大矩形”问题中，选择一个柱子作为分割点，问题可以被分为左右两个子问题，以及以该柱子为高的矩形，这三个部分的最大值即为答案。这种方法适合于问题具有明显的可分性，且子问题可以独立解决。

// 缺点：数组过大，会爆栈

// 具体步骤：
// 1、选取一个柱子作为分割点，通常选择区间内的最小高度柱子，因为它决定了以它为高的矩形的宽度。
// 2、递归地在分割点的左右两侧寻找最大矩形面积。
// 3、同时计算以分割点柱子为高的矩形面积，取这三个值中的最大值作为当前区间的解。
// 4、通过递归，不断细分并合并结果，直到处理到只有一个柱子的最小子问题。

function maxRectangleInHistogram(hist, start, end) {
    if (start > end) return 0;
    let minIndex = start;
    for (let i = start + 1; i <= end; i++) {
        if (hist[minIndex] > hist[i]) {
            minIndex = i;
        }
    }
    return Math.max(
        hist[minIndex] * (end - start + 1),
        maxRectangleInHistogram(hist, start, minIndex - 1),
        maxRectangleInHistogram(hist, minIndex + 1, end)
    );
}

function largestRectangleAreaDivideConquer(heights) {
    return maxRectangleInHistogram(heights, 0, heights.length - 1);
}


console.log(largestRectangleArea([2,1,5,6,2,3]));
console.log(largestRectangleArea([2,1,2]));
console.log(largestRectangleArea([2,4]));