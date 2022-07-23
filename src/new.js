/**
 * @param fn 一个构造函数
 * @param args 构造函数的参数列表
 */
function _new(fn, ...args){
    let ans = {};
    let returnVal = fn.call(ans, ...args);
    // Object.setPrototypeOf(ans, fn.prototype);
    ans.__proto__ = fn.prototype;
    return typeof returnVal === "object" && returnVal ? returnVal : ans;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
    // return "asass"
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

let obj = _new(Person, "hhn", 21);
console.log(obj);