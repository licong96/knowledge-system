// export default (str) => {
//   // 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
//   let arr = str.split(' ')
//   // 对数组进行遍历，然后每个元素进行反转
//   let result = arr.map(item => {
//     return item.split('').reverse().join('')
//   })
//   return result.join(' ')
// }

// export default (str) => {
//   // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
//   // 2. 对数组进行遍历，然后每个元素进行反转
//   return str.split(' ').map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// }

// export default (str) => {
//   // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
//   // 2. 对数组进行遍历，然后每个元素进行反转
//   return str.split(/\s/g).map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// }

export default (str) => {
  // 1. 字符串按空格进行分隔，保存数组，数组的元素的先后顺序就是单词的顺序
  // 2. 对数组进行遍历，然后每个元素进行反转
  // 对输入进行了限制（空）单词用空格隔开（没见过单词中有<等特殊字符之前考虑的是空格，单引号）(LeetCode测试用例)
  return str.length ? str.match(/[\S]+/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ') : ''
}

