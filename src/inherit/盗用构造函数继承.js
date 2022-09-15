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

let son = new Son("hhn", 20);

son.sayHello();
