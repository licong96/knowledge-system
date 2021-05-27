# 虚拟DOM(Virtual DOM)

问：什么是vdom？
答：vdom是真实DOM的一种映射。使用JS模拟出来的一种DOM结构。

问：vdom有什么用？
目的是为了提高性能。DOM操作本身非常耗费性能，JS本身运行却很快，为了减少复杂度，减少性能消耗，所以使用JS模拟DOM结构，先计算出最小变更，再操作DOM。


## 用JS模拟DOM结构

```
<div id="root">
    <h1 class="title">title name</h1>
    <ul class="list">
        <li class="list-item">item</li>
    </ul>
</div>
```
```
const vdom = {
    tag: 'div',
    props: {
        id: 'root'
    },
    children: [
        {
            tag: 'h1',
            props: {
                className: 'title',
            },
            children: 'title name'
        }, 
        {
            tag: 'ul',
            props: {
                className: 'list'
            },
            children: [
                {
                    tag: 'li',
                    props: {
                        className: 'list-item'
                    },
                    children: 'item'
                }
            ]
        }
    ]
}
```

### diff算法

问：什么是diff算法？
答：diff算法是JS对虚拟DOM对比的过程。

问：diff算法有什么用？
答：通过这个算法，计算对比出vdom的最小变更。

问：diff的比较规则是什么？
答：
    1.只比较同一级别，不跨级比较。
    2.同一级中tag不相同，则直接删除重建，不深度比较。
    3.同一级中tag和key，两者都相同，则认为是相同节点，不深度比较。


### key的作用



