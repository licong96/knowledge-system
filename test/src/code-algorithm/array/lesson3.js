export default (arr, n) => {
  // 计数器
  let max = 0
  // 右边界补充[0,0,0],最后一块地能不能种只取决于前面的是不是1，所以默认最后一块地的右侧是0（无须考虑右侧边界有阻碍）（LeetCode测试用例）
  arr.push(0)
  for (let i = 0, len = arr.length - 1; i < len; i++) {
    if (arr[i] === 0) {
      if (i === 0 && arr[1] === 0) {
        max++
        i++
      } else if (arr[i - 1] === 0 && arr[i + 1] === 0) {
        max++
        i++
      }
    }
  }
  return max >= n
}
