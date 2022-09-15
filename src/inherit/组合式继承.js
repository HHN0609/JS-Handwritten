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

// 对**盗用构造函数**的补充，让子类的原型  指向 父类的实例
Son.prototype = new Father();
// 对子类构造函数的原型，有过赋值操作的，都需要手动修改子类原型中的constructor指向
Son.prototype.constructor = Son;

// 缺点
// 1、父类的构造函数被new了两次，子类的实例 和 子类的原型 上存在两份父类实例的数据

let son = new Son("hhn", 21);
son.sayHello();
console.log(Son.prototype.constructor);
