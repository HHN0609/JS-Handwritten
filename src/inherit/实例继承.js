function Father() {
    this.name = "hhn";
}

// 在子类的构造函数中new一个父类实例，并往父类的实例上挂载子类的属性，返回这个父类的实例
function Son() {
    let instance = new Father();
    instance.age = 20; 
    return instance;
}

let son = new Son();
console.log(son.name);

