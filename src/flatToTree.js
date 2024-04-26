/**
 * 
 * @param {any[]} arr 
 */
function convertFlatToTree(arr) {
    let map = new Map();
    let root = null;
    for(let i=0; i<arr.length; i++) {
        const curr = {
            id: arr[i].id,
            children: [],  
        };
        if(arr[i].parentId === null) root = curr;
        map.set(arr[i].id, curr);
        if(map.has(arr[i].parentId)) {
            const parent = map.get(arr[i].parentId);
            parent.children.push(curr);
        }
        for(let j=0; j<arr[i].children?.length; j++) {
            if(map.has(arr[i].children[j])) {
                const son = map.get(arr[i].children[j]);
                curr.children.push(son);
            }
        }
    }
    return root;
}

const arr = [
    {
        id: 1,
        parentId: 0,
        children: [4, 5],
    },
    {
        id: 0,
        parentId: null,
        children: [1, 2],
    },
    {
        id: 3,
        parentId: 2,
        children: null,
    },
    {
        id: 2,
        parentId: 0,
        children: [3],
    },
    {
        id: 4,
        parentId: 1,
        children: null,
    },
    {
        id: 5,
        parentId: 1,
        children: null,
    },
];

console.log(convertFlatToTree(arr));