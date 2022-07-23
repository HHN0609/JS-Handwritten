Function.prototype._call = function(obj, ...args){
    // call的一个参数为空时，fn内部的this指向window（全局）
    if(obj === undefined || obj === null){
        obj = window;
    }
    const fn = this;
    let prototype = Object.getPrototypeOf(obj);
    
    const fnName = Symbol();
    // 挂载这个方法到这个对象的原型上
    prototype[fnName] = fn;
    
    // 调用对象原型上的这个方法
    let ans = obj[fnName](...args);

    // 把这个方法从对象的原型上拿掉
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

getInfo._call(person, 10, 10);

