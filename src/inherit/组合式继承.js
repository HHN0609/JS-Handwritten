function Father(name) {
    this.name = name;
}

Father.prototype.sayHello = function(){
    console.log("hello", this.name);
}

function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

Son.prototype = new Father();
// 对子类构造函数的原型，有过赋值操作的，都需要手动修改子类原型中的constructor指向
Son.prototype.constructor = Son;

let son = new Son("hhn", 21);
son.sayHello();
console.log(Son.prototype.constructor);
