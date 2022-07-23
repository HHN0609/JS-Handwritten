Function.prototype._apply = function(obj, args) {
    args = Array.isArray(args) ? args : [];
    let fn = this;
    if(obj === undefined || obj === null){
        obj = window;
    }
    let fnName = Symbol();
    let prototype = Object.getPrototypeOf(obj);
    prototype[fnName] = fn;
    let ans = obj[fnName](...args);
    prototype[fnName] = null;
    return ans;
}

let person = {
    name: 'jakeQuc',
    age: 18
}

function getInfo(a, b) {
    let sum = a + b;
    console.log('name:', this.name, 'age:', this.age, 'sum:', sum);
}

getInfo._apply(person, [10, 10]);
