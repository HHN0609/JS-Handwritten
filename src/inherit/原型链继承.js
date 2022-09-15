function Father() {
    this.name = "dad";
}

function Son() {
    this.age = "male";
}

// 父类的实例是 子类构造函数的原型
Son.prototype = new Father();
// 对子类构造函数的原型，有过赋值操作的，都需要手动修改子类原型中的constructor指向
Son.prototype.constructor = Son;

// 缺点:
// 1、无法多继承
// 2、无法通过子类构造函数向父类构造函数传参
// 父类实例的一些私有属性，对子类来说都是共享的，有好有坏

let son = new Son();
console.log(son.name);
console.log(son.constructor);
