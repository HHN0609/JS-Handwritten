// 用setTimeout实现setInterval

class SetInterval {
    constructor(callback, interval, ...args) {
        this.args = args;
        this.id;
        this._setInterval(callback, interval);
    }

    _setInterval(callback, interval) {
        this.id = setTimeout(() => {
            callback(...this.args);
            this._setInterval(callback, interval);
        }, interval);
    }

    _clearInterval(id) {
        clearTimeout(id);
    }
}

function sayName(name){
    console.log(name);
}
let timer1 = new SetInterval(sayName, 1000, "hhn");
let timer2 = new SetInterval(sayName, 1000, "lyk");

setTimeout(() => {
    console.log("Close timer");
    timer1._clearInterval(timer1.id);
}, 5000);
