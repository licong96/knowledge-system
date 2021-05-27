## 基础知识


## 原理

### Vue2.0/3.0双向数据绑定原理

各自的好处，到掘金上面寻找一些文章。

#### Vue2.0使用ES5方法：defineProperty

数据劫持

Object.defineProperty(obj, 'key', {
    get() {},
    set() {},
});

#### Vue3.0使用ES6方法：Proxy

let obj = {};

obj = new Proxy(obj, {
    get(target, prop) {},
    set(target, prop, value) {}
});



## vue-router


## vuex


## 单元测试

## 服务器渲染

## 组件库
