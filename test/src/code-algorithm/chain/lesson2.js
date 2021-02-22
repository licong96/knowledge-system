// 声明链表的节点

class Node {
  constructor (value) {
    this.val = value
    this.next = undefined
  }
}

// 声明链表的数据结构

class NodeList {
  constructor (arr) {
    // 声明链表的头部节点
    let head = new Node(arr.shift())
    let next = head
    arr.forEach(item => {
      next.next = new Node(item)
      next = next.next
    })
    return head
  }
}

export default function isCircle (head) {
  // 慢指针
  let slow = head
  // 快指针
  let fast = head.next
  while (1) {
    if (!fast || !fast.next) {
      return false
    } else if (fast === slow || fast.next === slow) {
      return true
    } else {
      slow = slow.next
      fast = fast.next.next
    }
  }
}

export {
  Node,
  NodeList
}
