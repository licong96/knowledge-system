








const a = {
	val: 'a'
}
const b = {
	val: 'b'
}
const c = {
	val: 'c'
}
const d = {
	val: 'd'
}

a.next = b;
b.next = c;
c.next = d;


// 插入
const e = {
	val: 'e'
}
// c上面，b后面
e.next = b.next;
b.next = e;
// e.next = c;


// 删除
b.next = c;


// 遍历
let p = a;
while (p) {
	console.log(p.val);
	p = p.next;
}
