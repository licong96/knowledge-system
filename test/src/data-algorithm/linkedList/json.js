// 使用链表指针获取json的节点值

const json = {
    a: {
        b: {
            c: 1
        }
    },
    d: {
        e: 2
    }
}
const path = ['a', 'b', 'c'];

let p = josn;
path.forEach(k => {
    p = path[k];
});

console.log(p); // 1
