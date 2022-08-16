// 参考leetcode的二叉树序列化
// 特别注意这棵树不一定是完全二叉树
// convert [1,2,3,null,null,4,5]
// to
// {
//     val: 1,
//     left: {
//         val: 2,
//         left: null,
//         right: null,
//     },
//     right: {
//         val: 3,
//         left: {
//             val: 4,
//             left: null,
//             right: null,
//         },
//         right: {
//             val: 5,
//             left: null,
//             right: null,
//         }
//     }
// }



/**
 * 迭代实现
 * @param {number[]} arr 
 * @return {object}
 */
function arrayToBinaryTree(arr) {
    if(arr[0] === null) return {val: null, left: null, right: null};
    let queue = [];
    let root = {
        val: arr[0],
        left: null,
        right: null
    }
    arr.shift();
    queue.push(root);
    while(queue.length !== 0){
        // 下一层的节点数量
        let nextLevelCount = queue.length * 2;
        let node;
        for(let i=0; i<nextLevelCount; i++){
            let val = arr.shift();
            if(val === undefined){
                return root;
            }
            if(i % 2 === 0) {
                // left child
                node = queue.shift();
                if(val === null) {
                    node.left = null;
                } else {
                    node.left = {
                        val,
                        left: null,
                        right: null,
                    };
                    queue.push(node.left);
                }
            } else {
                // right child
                if(val === null){
                    node.right = null;
                } else {
                    node.right = {
                        val,
                        left: null,
                        right: null,
                    }
                    queue.push(node.right);
                }
            }
        }
    }
    return root;
}
let case1 = [1,2,3,null,null,4,5, 6, null, 7, 8,null];
console.log(arrayToBinaryTree(case1));