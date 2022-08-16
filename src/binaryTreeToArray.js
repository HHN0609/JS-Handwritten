// 参考leetcode的二叉树序列化
// 特别注意这棵树不一定是完全二叉树
// convert 
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
// to
// [1,2,3,null,null,4,5]
// 注意：如果一个节点的val是null，则left和right都是null

/**
 * 迭代实现
 * @param {object} tree
 * @return {number[]} 
 */
function binaryTreeToArray( tree ){
    // if(tree.val === null) return [ null ];
    let ans = [];
    let queue = [tree];
    while(queue.length !== 0){
        let node = queue.shift();
        if(node && node.val !== null){
            ans.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            ans.push(null);
        }
    }
    return ans;
}

// [1,2,3,null,null,4,5, 6, null, 7, 8]
let case1 = {
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null,
    },
    right: {
        val: 3,
        left: {
            val: 4,
            left: {
                val: 6,
                left: null,
                right: null,
            },
            right: null,
        },
        right: {
            val: 5,
            left: {
                val: 7,
                left: null,
                right: null,
            },
            right: {
                val: 8,
                left: null,
                right: null,
            }
        }
    }
};
console.log(binaryTreeToArray(case1));

console.log(binaryTreeToArray({
    val: null,
    left: {
        val: 2,
        left: null,
        right: null
    },
    right: {
        val: 3,
        left: null,
        right: null
    }
}));
