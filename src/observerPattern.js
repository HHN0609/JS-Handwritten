
// 这个被观察者是核心
class Subject {
    constructor() {
        this.observerLit = [];
    }

    addObserver(observer) {
        this.observerLit.push(observer);
    }

    // 移除指定的观察者
    removeObserver(observer) {
        let index = this.observerLit.findIndex((_observer) => _observer.name === observer.name);
        if(index !== -1){
            this.observerLit.splice(index, 1);
        } else {
            console.error(`No observer named ${observer.name}`);
        }
    }

    // 一下子通知全部的观察者
    notifyObservers(...args) {
        for(let observer of this.observerLit){
            observer.notified(...args);
        }
    }
}

// 这里的观察者 观察 被观察者 的变化，观察者并不会主动观察， 而是被观察者发生变化通知观察者
// 观察者在被通知后的
class Observer {
    // subject指定了这个Observer要观察的对象
    constructor(name, subject) {
        this.name = name;
        subject.addObserver(this);
    }

    notified(...args) {
        console.log("Receive the notice", ...args);
    }
}

const subject = new Subject();
const observerA = new Observer('observerA', subject);
subject.notifyObservers('Hello from subject');
subject.removeObserver(observerA);
subject.notifyObservers('Hello again');
