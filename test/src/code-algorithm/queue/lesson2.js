export default (tasks, n) => {
  // 存储CPU执行的任务
  let q = []
  // 给定任务列表的长度
  let len = tasks.length
  // 按照相同任务重复次数最多的降序排列
  tasks = tasks.sort().join('').match(/(\w)\1+|\w/g).sort((a, b) => b.length - a.length).join('').split('')
  while (len > 0) {
    if (!q.length) {
      q.push(tasks.shift())
      len--
    } else {
      let slice = q.slice(-n)
      let is = -1
      for (let i = 0, l = tasks.length; i < l; i++) {
        if (!slice.includes(tasks[i])) {
          q.push(tasks[i])
          is = i
          break
        }
      }
      if (is !== -1) {
        tasks.splice(is, 1)
        len--
      } else {
        q.push('-')
      }
    }
  }
  return q.length
}
