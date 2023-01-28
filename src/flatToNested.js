/**
 * 平铺对象转换为嵌套对象(树形结构)
 * @param {object[]} flatArr 
 */
function flatToNested(flatArr){
    flatArr.sort((a, b) => a.pid - b.pid);
    let ans = {
        id: 0,
        data: "",
        children: []
    };
    let map = new Map();
    map.set(0, ans);
    for(let node of flatArr){
        let temp = {
            id: node.id,
            data: node.data,
            children: []
        };
        map.set(node.id, temp);
        let p = map.get(node.pid);
        p.children.push(temp);
    }
    return ans;
}

// pid == 0说明是root
const testcase = [
    {id: 1, pid: 0, data: "1"},
    {id: 2, pid: 1, data: "2"},
    {id: 3, pid: 1, data: "3"},
    {id: 4, pid: 2, data: "4"},
    {id: 5, pid: 3, data: "5"},
    {id: 6, pid: 1, data: "6"},
    {id: 7, pid: 6, data: "7"},
    {id: 8, pid: 5, data: "8"},
    {id: 9, pid: 7, data: "9"},
];

const ans = flatToNested(testcase);
console.log(ans);