/**
 * 
 * @param {number[]} arr 
 * @returns {number[]}
 */
function duplicateRemoval1(arr) {
    let ans = [];
    let p = -1;
    arr.sort((a, b) => a - b);
    arr.forEach((value) => {
        if(p === -1){
            ans.push(value);
            p++;
        } else {
            if(value !== ans[p]) {
                ans.push(value);
                p++
            }
        }
    });
    return ans;
}

/**
 * 
 * @param {number[]} arr 
 * @returns {number[]}
 */
function duplicateRemoval2(arr) {
    return [ ...new Set(arr).values() ];
}

/**
 * 
 * @param {number[]} arr 
 * @returns {number[]}
 */
function duplicateRemoval3(arr) {
    if(arr.length === 1) return [...arr];
    let k = 0;
    let p = 1;
    arr.sort((a, b) => a - b);
    while(p < arr.length) {
        if(arr[k] === arr[p]){
            p++;
        } else {
            arr[k + 1] = arr[p];
            k++;
            p++;
        }
    }
    return arr.slice(0, k + 1);
}

/**
 * 
 * @param {number[]} arr 
 * @returns {number[]}
 */
function duplicateRemoval4(arr) {
    return arr.filter((value, index) => {
        return arr.indexOf(value) === index;
    });
}

let arr = [0, 10, 2, -1, 3, 9, -19, 10, 1, 0, 2, -1];
let ans = duplicateRemoval4(arr);
console.log(ans);

