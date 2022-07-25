/**
 * 
 * @param {Array} arr 
 * @param {number} depth
 */
function flat(arr, depth=1){
    if(!Array.isArray(arr)) {
        throw new TypeError("arr musr be an Array");
    }

    // depth为0就返回一个浅拷贝
    if(depth === 0) return [...arr];
    let newArr = [];
    for(let item of arr) {
        if(Array.isArray(item)){
            newArr.push(...flat(item, depth - 1));
        } else {
            newArr.push(item);
        }
    }
    return newArr;
}

// 数组扁平化
let arr = [0, 1, 2, [3, 4, 5, [6]]];
// let arr2 = arr.flat(0);
// depth === 0返回一个浅拷贝
// console.log(arr2 === arr);

let arr3 = flat(arr, 1);
console.log(arr3);
console.log(arr[3][3] === arr3[6]); // true

let arr4 = flat(arr, 0);
console.log(arr4 === arr);