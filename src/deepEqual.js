// 深度判断a, b是否相等，不考虑Date等特殊情况
function deepEqual(a, b) {
    if(a === b) return true;
    if(typeof a !== typeof b) return false;
    if(typeof a !== 'object') return a === b;
    if(Array.isArray(a) === Array.isArray(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if(aKeys.length !== bKeys.length) return false;
        return aKeys.every((key, index) => {
            return key === bKeys[index] && deepEqual(a[key], b[key]);
        });
    } else {
        return false;
    }
}

console.log(deepEqual(1, 1)) // => true
console.log(deepEqual(1, 2)) // => false
console.log(deepEqual(1, '1')) // => false
console.log(deepEqual([1,2], [1,2])) // => true
console.log(deepEqual([1, { a: 1, b: 2 }], [1, { a: 1, b: 2 }])) // => true
console.log(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })) // => true
console.log(deepEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })) // => false
console.log(deepEqual({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] })) // => true