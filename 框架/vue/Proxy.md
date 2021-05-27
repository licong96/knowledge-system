# Vue3.0 - Proxy

3.0：使用Proxy实现数据响应式。

2.0：使用defineProperty实现数据响应式。


## Object.defineProperty 的缺点
1. 深度监听需要一次性递归，有性能瓶颈。
2. 无法监听新增属性和删除属性，需要使用Vue.set等方法。
3. 无法原生监听数组，需要特殊处理。


## Proxy 基本使用
```
new Proxy(data, {
    get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        return result;
    },
    set(target, key, val, receiver) {
        const result = Reflect.set(target, key, val, receiver);
        return result;
    },
    deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        return result;
    }
})
```
