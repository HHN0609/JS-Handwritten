function PromiseAll(promiseIterator) {
    if (!promiseIterator[Symbol.iterator]) {
        throw new Error("promiseIterator must be an iterator!");
    }
    let len = promiseIterator.length;
    // 返回的res数组中的顺序要和promiseIterator的顺序一一对应
    // 注意这里不是那个promise先resolve就被先加到res里的
    let res = new Array(len).fill(0);
    let fulfilledCount = 0;
    let index = 0;
    return new Promise((resolve, reject) => {
        for(let promise of promiseIterator){
            let _index = index;
            Promise.resolve(promise)
                .then((value) => {
                    res[_index] = value;
                    fulfilledCount++;
                    if(fulfilledCount === len) {
                        resolve(res);
                    }
                })
                .catch((reason) => {
                    // 如果没有全部resolve，返回reject第一个出错的
                    reject(reason);
                });
            index++;
        }
    });
}


// 方法promiseA，返回一个Promise对象
function promiseA() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('A')
			resolve('A')
		}, 3000)
	})
}
// 方法promiseB，返回一个Promise对象
function promiseB() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('B')
			resolve('B')
		}, 1000)
	})
}

// 按照A, B的顺序添加到promise数组中
PromiseAll([promiseA(), promiseB()]).then(resolve => {
	console.log(resolve)
})
