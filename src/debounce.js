
/**
 * 防抖：在delay时间段内，会在delay时间后执行，如果这段时间内又触发了函数，则重新计时delay秒
 * @param {Function} fn 
 * @param {number} delay 
 * @return {Function}
 */
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    }
}

function sayHello(name){
    console.log("Hello" + name);
}

let fn = debounce(sayHello, 1000);

setInterval(fn, 500, "hhn");