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

// 这总方法是对组合式继承的优化和改进
// 组合式继承中，new了两次父类的构造函数，造成了产生两个父类实例，其中作为子类原型的那个实例其实是不需要数据的
// 那就构造一个没有属性的**空的构造函数**，去代替原来的父类的构造函数，但是父类构造函数的原型对象是有用的
// 所以需要让**空的构造函数**的原型指向父类构造函数的原型

// 构造一个空的构造函数
function Empty() {}
Empty.prototype = Father.prototype;
Son.prototype = new Empty();
// Son.prototype = Object.create(Father.prototype);
// 对子类构造函数的原型，有过赋值操作的，都需要手动修改子类原型中的constructor指向
Son.prototype.constructor = Son;

let son = new Son(21, "hhn");
console.log(son.name);
console.log(son.constructor);
son.sayHello();
