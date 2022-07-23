Function.prototype._bind = function(obj, ...args){
    // fn为调用bind的函数
    const fn = this;

    // 新的this的值应该是一个对象，但是不能是null
    if(typeof obj !== "object" || obj === null) return undefined;
    
    function bound(...restArgs) {
        const _this = this;
        if(_this instanceof bound){
            // 被当作构造函数调用
            fn.call(_this, ...args, ...restArgs);
            Object.setPrototypeOf(_this, fn.prototype);
            return _this;
        } else {
            return fn.call(obj, ...args, ...restArgs); 
        }
    }
    return bound;
}

function Person(name, age){
    this.name = name;
    this.age = age;
}

let obj = {
    height: 180
};

let _person = Person._bind(obj, "hhn");
_person(21);

// bind返回的函数配合new一起使用，则忽略之前绑定的this
let o = new _person(22);

console.log(obj);
console.log(o);



