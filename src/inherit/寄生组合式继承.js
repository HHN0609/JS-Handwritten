function Father(name) {
    this.name = name;
}

Father.prototype.sayHello = function() {
    console.log("hello", this.name);
}

function Son(age, name) {
    Father.call(this, name);
    this.age = age;
}

// 构造一个空的构造函数
function Empty() {}
Empty.prototype = Father.prototype;
Son.prototype = new Empty();
// 对子类构造函数的原型，有过赋值操作的，都需要手动修改子类原型中的constructor指向
Son.prototype.constructor = Son;

let son = new Son(21, "hhn");
console.log(son.name);
console.log(son.constructor);
son.sayHello();
