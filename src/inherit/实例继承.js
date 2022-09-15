function Father() {
    this.name = "hhn";
}

// 在子类的构造函数中new一个父类实例，并往父类的实例上挂载子类的属性，返回这个父类的实例
function Son() {
    let instance = new Father();
    instance.age = 20; 
    return instance;
}

// 缺点
// 1、只是给父类的实例添加几个子类的属性
// 2、生成的子类实例，在后面无法得知其构造函数是谁
// 3、并不符合“继承”的概念，子类的原型断了

let son = new Son();
console.log(son.name);

