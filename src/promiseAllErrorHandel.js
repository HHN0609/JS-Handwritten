// 对Promise.all的改进，使得有被reject的也能返回全部的结果（resolve的和reject的）

function PromiseAllErrorHandle (promiseIterator) {
    if(!promiseIterator[Symbol.iterator]){
        console.log("promiseIterator must be an iterator");
    }
    // 给每个promise添加一个catch捕获错误，让Promise.all接收到的都是resolve的promise
    let arr = promiseIterator.map((promise) => {
        return Promise.resolve(promise).catch((reason) => {
            return reason;
        });
    });
    return Promise.all(arr);
}
PromiseAllErrorHandle([Promise.reject("111"), Promise.resolve("222")]).then((value) => {
    console.log(value);
})