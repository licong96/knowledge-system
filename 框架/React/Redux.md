# Redux
1. 基本概念
2. 单项数据流
3. react-redux
4. 异步 action
5. 中间件

## 基本概念
不可变值
纯函数

store   state
action
reducer

## 单项数据流
首先是 dispatch(action)，然后是 reducer 产生一个新的 newState，subscribe 出发通知。