// 根据promiseAll改进
function PromiseAllSettled(promiseIterator) {
    if(!promiseIterator[Symbol.iterator]){
        throw new Error("promiseIterator must be an iterator!");
    }
    let newIterator = promiseIterator.map((promise) => {
        return Promise.resolve(promise).then((value) => {
            return {status: "resolve", value};
        }).catch((reason) => {
            return {status: "reject", reason};
        });
    })
    return Promise.all(newIterator);
}

PromiseAllSettled([Promise.reject("111"), Promise.resolve("222")]).then((value) => {
    console.log(value);
})
