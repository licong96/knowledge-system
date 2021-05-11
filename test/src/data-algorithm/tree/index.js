// 树，一种分层数据的抽象模型
// JS中没有树，但是可以用Object和Array构建树

const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: []
                },
                {
                    val: 'e',
                    children: []
                }
            ]
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: []
                },
                {
                    val: 'g',
                    children: []
                }
            ]
        }
    ]
}

/**
 * 深度优先遍历
 * 尽可能深的搜索树的分支
 * 
 * 算法口诀：
 * 1.访问根节点。
 * 2.对根节点的children挨个进行深度优先遍历
 * 
 * 方法：使用递归
 */
function dfs(tree) {
    console.log(tree.val);
    // tree.children.forEach(child => {
    //     dfs(child);
    // });
    // 精简写法
    tree.children.forEach(dfs);
}
// dfs(tree);


/**
 * 广度优先遍历
 * 先访问离根节点最近的节点
 * 
 * 算法口诀：
 * 1.新建一个队列，把根节点入队
 * 2.把队头出队并访问
 * 3.把队头的children挨个入队
 * 4.重复第二，第三步，直到队列为空
 */
function bfs(tree) {
    const q = [tree];
    while(q) {
        const first = q.shift();
        console.log(first.val);
        first.children.forEach(child => {
            q.push(child);
        })
    }
}
bfs(tree);


// 二叉树