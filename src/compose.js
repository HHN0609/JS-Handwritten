// compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)

/**
 * compose from left to right
 * @param  {...Function} funs 
 * @return {Function}
 */
function compose(...funs){
    if(funs.length === 0) return (val) => val;
    if(funs.length === 1) return funs[0];

    return function(...args){
        let ans;
        for(let i=funs.length-1; i>=0; i--){
            if(i === funs.length-1){
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

const a =  () => console.log(1);
const b =  () => console.log(2);
const c =  () => console.log(3);
compose(a, b, c)(); // 分别打印 3 、 2 、 1
