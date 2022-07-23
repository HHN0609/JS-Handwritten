class EventEmitter {
    constructor() {
        this.message = new Map();
    }

    /**
     * 订阅事件及其回调函数
     * @param {string} type 事件名
     * @param {Function} callback 事件对应的回调函数
     */
    $on(type, callback) {
        if(!type || !callback) return;
        if (this.message.has(type)) {
            this.message.get(type).push(callback);
        } else {
            this.message.set(type, [ callback ]);
        }
    }

    /**
     * 取消订阅事件及其回调函数，callback为空时候清除全部事件
     * @param {string} type 事件名
     * @param {Function} callback 事件对应的回调函数
     */
    $off(type, callback) {
        if(!type) return;
        if(!this.message.has(type)) {
            console.error("No such type!");
            return;
        }
        let cbs = this.message.get(type);
        if (callback) {
            let index = cbs.indexOf(callback);
            cbs.splice(index, 1);
            if(cbs.length === 0) this.message.delete(type);
        } else {
            cbs.push(callback);
        }
    }

    /**
     * 触发订阅事件的回调函数
     * @param {string} type 事件名
     */
    $emit(type) {
        if(!this.message.has(type)){
            console.error("No such type!");
            return;  
        } 
        this.message.get(type).forEach((callback) => {
            callback();
        })
    }

    /**
     * 订阅事件及其回调函数，但是这个回调函数只会执行一次
     * @param {string} type 事件名
     * @param {Function} callback 事件对应的回调函数
     */
    $once(type, callback) {
        let _callback = () => {
            callback();
            this.$off(type, _callback);
        }
        this.$on(type, _callback);
    }
}

function handlerA() {
    console.log('handlerA');
}
function handlerB() {
    console.log('handlerB');
}
function handlerC() {
    console.log('handlerC');
}

let emitter = new EventEmitter();
emitter.$once("handleA", handlerA);
emitter.$emit("handleA");
emitter.$emit("handleA");
emitter.$emit("handleA");