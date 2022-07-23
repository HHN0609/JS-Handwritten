function PromiseAny(promiseIterator) {
    if(!promiseIterator[Symbol.iterator]){
        throw new Error("promiseIterator must be an iterator!");
    }
    let rejectCount = 0;
    let len = promiseIterator.length;
    return new Promise((resolve, reject) => {
        for(const promise of promiseIterator){
            Promise.resolve(promise)
                .then((value) => {
                    resolve(value);
                })
                .catch(() => {
                    rejectCount++;
                    if(rejectCount === len){
                        reject("AggregateError: All promises were rejected");
                    }
                });
        }
    });
}