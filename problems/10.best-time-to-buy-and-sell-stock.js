// 题目：买卖股票的最佳时机
// https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/
// 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
// 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
// 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

// 示例 1：
// 输入：[7,1,5,3,6,4]
// 输出：5
// 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
//      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。

// 示例 2：
// 输入：prices = [7,6,4,3,1]
// 输出：0
// 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。


// 暴力解思路 - 超时
// 1、初始化一个变量，最大的利润 maxProfitPrice
// 2、开启双重循环遍历，计算出所有符合规则(卖出价格大于买入价格、卖出日期大于买入日期)的最大利润，与maxProfitPrice 比较取较大的
// 3、return maxProfitPrice
/**
 * @param {number[]} prices
 * @return {number}
 */
// function maxProfit(prices) {
//     let maxProfitPrice = 0;
//     for(let i = 0; i < prices.length; i++) {
//         for(let j = 1; j < prices.length; j++) {
//             // 符合规则（卖出日期大于买入日期、卖出价格大于买入价格）
//             if (i < j && prices[i] < prices[j]) {
//                 const diff = prices[j] - prices[i];
//                 maxProfitPrice = Math.max(diff, maxProfitPrice);
//             }
//         }
//     }
//     return maxProfitPrice;
// };


// 滑动窗口思路 - 推荐
// 1、初始化两个变量，最大利润 maxProfitPrice，最低买入价格 minPrice
// 2、从数组第二个元素开始，开启一次循环遍历，如果当前价格低于minPrice，则更新minPrice，继续下一次遍历，否则的话就用当前价格作为卖出价格与minPrice计算最大利润，计算出来的最大利润与初始化的maxProfitPrice取最大值赋值给maxProfitPrice
// 3、return maxProfitPrice
function maxProfit(prices) {
    // 初始化最大利润 和 最低买入价格
    let maxProfitPrice = 0;
    let minPrice = prices[0];

    // 从数组的第一个元素开始，买入卖出不能在同一天
    for(let i = 1; i < prices.length; i++) {
        // 当前卖出价格低于minPrice时更新minPrice
        // 因为使用prices[i]计算出的最大利润肯定是要大于此时继续使用原先minPrice的
        // 可以避免无效的比较
        if (prices[i] < minPrice) {
            minPrice = prices [i];
            // 本轮循环后续操作就没有必要了
            continue;
        }

        const diffPrice = prices[i] - minPrice;
        maxProfitPrice = Math.max(diffPrice, maxProfitPrice);
    }
    return maxProfitPrice;
}

console.log(maxProfit([7,1,5,3,6,4]));
console.log(maxProfit([7,6,4,3,1]));
