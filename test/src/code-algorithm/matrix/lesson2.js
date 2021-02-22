export default (arr) => {
  // 获取n的维度
  let vecor = arr.length
  // 垂直翻转
  for (let i = 0, len = vecor / 2; i < len; i++) {
    for (let j = 0, tmp; j < vecor; j++) {
      tmp = arr[i][j]
      arr[i][j] = arr[vecor - i - 1][j]
      arr[vecor - i - 1][j] = tmp
    }
  }
  // 对角线翻转
  for (let i = 0; i < vecor; i++) {
    for (let j = 0, tmp; j < i; j++) {
      tmp = arr[i][j]
      arr[i][j] = arr[j][i]
      arr[j][i] = tmp
    }
  }
  return arr
}
