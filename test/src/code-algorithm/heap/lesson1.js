class Heap {
  constructor (str) {
    let map = new Map()
    str.split('').forEach(item => {
      if (map.has(item)) {
        map.set(item, map.get(item) + 1)
      } else {
        map.set(item, 1)
      }
    })
    this.map = map
    this.data = Array.from(map.values())
  }
  sort () {
    let iArr = this.data
    let n = iArr.length
    if (n <= 1) {
      return iArr
    } else {
      for (let i = Math.floor(n / 2); i >= 0; i--) {
        Heap.maxHeapify(iArr, i, n)
      }
      for (let j = 0; j < n; j++) {
        Heap.swap(iArr, 0, n - 1 - j)
        Heap.maxHeapify(iArr, 0, n - 1 - j - 1)
      }
      return iArr
    }
  }
  toString () {
    let arr = this.sort()
    let str = []
    while (arr.length) {
      let top = arr.pop()
      for (let [k, v] of this.map) {
        if (v === top) {
          str.push(k.repeat(v))
          this.map.delete(k)
          break
        }
      }
    }
    return str.join('')
  }
  // 交换两个元素
  static swap (arr, a, b) {
    if (a === b) {
      return
    }
    let c = arr[a]
    arr[a] = arr[b]
    arr[b] = c
  }
  // 构建最大堆的过程
  static maxHeapify (Arr, i, size) {
    // 左节点（索引）
    let l = i * 2 + 1
    // 右节点
    let r = i * 2 + 2
    let largest = i
    // 父节点i和左节点l做比较取最大
    if (l <= size && Arr[l] > Arr[largest]) {
      largest = l
    }
    // 右节点和最大值比较
    if (r <= size && Arr[r] > Arr[largest]) {
      largest = r
    }
    if (largest !== i) {
      Heap.swap(Arr, i, largest)
      Heap.maxHeapify(Arr, largest, size)
    }
  }
}

export default Heap
