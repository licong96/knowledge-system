// 链表
// 使用对象模拟链表结构，通过next属性修改链表

const a = {
    val: 'a'
}
const b = {
    val: 'b'
}
const c = {
    val: 'c'
}

a.next = b;
b.next = c;

// 插入
const d = {
    val: 'd'
}
// 后面插入
// c.next = d;

// 中间插入
b.next = d;
d.next = c;

// 删除
b.next = c;

// 遍历链表
let p = a;
while(p) {
    console.log(p.val);
    p = p.next;
}

// LeetCode
// 237，删除指定链表
// 206，翻转链表，双指针遍历链表
// 2，两数相加
// 83，
// 141，
