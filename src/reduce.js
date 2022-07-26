/**
 * 
 * @param {Function} callback 
 * @param {any} initialValue 
 */
function _reduce(callback, initialValue) {
    let arr = this;
    let startIndex = 1;
    let prev = arr[0];

    if(initialValue){
        startIndex = 0
        prev = initialValue;
    }
    for(let i=startIndex; i<arr.length; i++){
        prev = callback(prev, arr[i], i, arr);
    }
    return prev;
}

Array.prototype._reduce = _reduce;

let ans = [1, 2, 3, 4]._reduce((prev, curr) => {
    return prev + curr;
}, -10);

console.log(ans);