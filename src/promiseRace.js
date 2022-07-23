// Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个 promise 解决或拒绝，返回的 promise 就会解决或拒绝。
function PromiseRace (promiseIterator) {
    if(!promiseIterator[Symbol.iterator]){
        throw new Error("promiseIterator must be an iterator!");
    }
    return new Promise((resolve, reject) => {
        for(let promise of promiseIterator) {
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value);
                })
                .catch((reason) => {
                    reject(reason);
                });
        }
    });
}