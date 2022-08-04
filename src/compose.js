// compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)

/**
 * compose from left to right
 * @param  {...Function} funs 
 * @return {Function}
 */
function compose(...funs){
    return function(...args){
        let ans;
        for(let i=funs.length-1; i>=0; i--){
            if(!ans || i === funs.length-1){
                ans = funs[i](...args);
            } else {
                ans = funs[i](ans);
            }
        }
        return ans;
    }
}

let fun1 = x => x + 1;
let fun2 = x => x + 2;
let fun3 = x => x + 3;

let ans = fun3(fun2(fun1(1)));
console.log(ans)

let composedFun = compose(fun3, fun2, fun1);
console.log(composedFun(1));