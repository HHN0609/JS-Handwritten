function Father(name) {
    this.name = name;
    this.sayHello = function () {
        console.log("Hello man");
    }
}

// 在子类构造函数中用call方法调用构造函数，改变父类构造函数中的this指向，指向子类产生的this
function Son(name, age) {
    Father.call(this, name);
    this.age = age;
}

// 优点
// 1、可以多继承
// 2、可以向父类构造函数传入参数
// 缺点
// 1、只能继承父类的实例属性和方法，不能继承父类原型上的属性和方法

let son = new Son("hhn", 20);

son.sayHello();
