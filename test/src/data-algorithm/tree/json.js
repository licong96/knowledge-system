// 遍历JSON中所有节点值

const json = {
    a: {
        b: {
            c: 1
        }
    },
    d: {
        e: 2
    },
    f: [3, 4, 5]
}

function dfs(n, path) {
    console.log(n, path);
    Object.keys(n).forEach(k => {
        dfs(n[k], [...path, k])
    })
}
dfs(json, []);
