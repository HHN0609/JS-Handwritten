
/**
 * 节流，函数fn在delay时间内被多次触发，只会响应第一次，delay事件后再次点击才会响应
 * @param {Function} fn 
 * @param {number} delay 
 * @return {Function}
 */
function throttle(fn, delay){
    let prev;
    let curr;
    return function(...args) {
        curr = Date.now();
        // 首次执行的时候，prev为undefined，直接执行
        if(!prev || curr - prev > delay){
            prev = curr
            return fn(...args);
        }
    }
}

function sayHello(name) {
    console.log("hello " + name);
}

let fn = throttle(sayHello, 1000);

setInterval(fn, 0, "hhn");