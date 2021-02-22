export default (fights, src, dst, k) => {
  // 将fights作为参数和LeetCode一致
  let cheap = (fights, src, dst, k) => {
    let prev = fights.filter(item => item[1] === dst)
    let min = Math.min.apply(null, prev.map(item => {
      if (item[0] === src && k > -1) {
        return item[2]
      } else if (k === 0 && item[0] !== src) {
        return Number.MAX_SAFE_INTEGER
      } else {
        return item[2] + cheap(fights, src, item[0], k - 1)
      }
    }))
    return min
  }
  // 增加返回值是不是Number.MAX_SAFE_INTEGER，如果是返回-1
  let min = cheap(fights, src, dst, k)
  return min >= Number.MAX_SAFE_INTEGER ? -1 : min
}
