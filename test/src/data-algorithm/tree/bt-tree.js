// 二叉树
// 树中每个节点最多只能有两个节点，在JS中使用Object来模拟二叉树

const tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    }
}

/**
 * 先序遍历
 * 
 * 算法口诀：
 * 1.访问根节点
 * 2.对根节点的左子树进行先序遍历
 * 3.对根节点的右子树进行先序遍历
 * 
 * 递归版
 */
function preorder(root) {
    if (!root) return;
    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
}
// preorder(tree);

// 非递归版
// 递归的本质是函数调用堆栈，可以用栈来模式递归的过程
function preorder2(root) {
    const stack = [root];
    while(stack) {
        const last = stack.pop();
        console.log(last.val);
        if(last.right) stack.push(last.right);
        if(last.left) stack.push(last.left);
    }
}
preorder2(tree);


/**
 * 中序遍历
 * 
 * 算法口诀：
 * 1.对根节点的左子树进行中序遍历
 * 2.访问根节点
 * 3.对根节点的右子树进行中序遍历
 * 
 * 方法：递归版
 */
 function inorder(root) {
     if(!root) return;
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
 }
//  inorder(tree);


 /**
 * 后序遍历
 * 
 * 算法口诀：
 * 1.对根节点的左子树进行后序遍历
 * 2.对根节点的右子树进行后序遍历
 * 3.访问根节点
 * 
 * 方法：递归
 */
function postorder(root) {
    if (!root) return;
    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
}
// postorder(tree);
