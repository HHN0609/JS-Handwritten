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

let son = new Son();
console.log(son.name);
console.log(son.constructor);
