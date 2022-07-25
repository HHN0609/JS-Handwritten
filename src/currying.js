// 函数柯里化
// 阮一峰的ES6入门教程里说拆分后的每个函数只能传递一个参数
// 这里可以传多个

/**
 * @param {Function} fn 
 * @return {Function}
 */
function currying(fn) {
    if(typeof fn !== "function") throw TypeError("fn is not an function");
    let neededArgsLength = fn.length;
    return nest;

    function nest(...args) {
        if(args.length >= neededArgsLength){
            return fn(...args);
        } else {
            return (...restArgs) => {
                return nest(...args, ...restArgs);
            }
        }
    }
}

let sum = (a, b, c) => {
    return a + b + c;
}

let __sum = currying(sum);

__sum = __sum(1);
__sum = __sum(1);

console.log(__sum(2));