// 原型链的本质是链表结构，通过__proto__属性连接原型对象

var obj = {};
var func = () => {};
var arr = [];

// obj -> Object.prototype -> null

// func -> Function.prototype - Object.prototype -> null

// arr -> Array.prototype -> Object.prototype -> null

// 除了Object类型以外，其它类型会先指向自己类型的原型对象，然后再指向Object的原型对象。


/**
 * 原型链知识点
 * 1. 如果 A 沿着原型链能够找到 B.prototype ，那么 A instanceof B 为true
 * 2. 如果在 A 对象上没有找到x属性，那么会沿着原型链找x属性
 */
console.log(obj instanceof Object)  // true

console.log(func instanceof Function)  // true
console.log(func instanceof Object)  // true

console.log(arr instanceof Array)  // true
console.log(arr instanceof Object)  // true


// instanceof原理，遍历A的原型链
function myInstanceof(A, B) {
    let p = A;
    while(p) {
        if (p === B.prototype) {
            return true
        };
        p = p.__proto__;
    }
    return false;
}

console.log(myInstanceof(obj, Object));
