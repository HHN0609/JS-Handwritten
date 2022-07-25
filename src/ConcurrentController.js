
/**
 * Promise.all并发控制器，限制最大同时请求数量
 * @param {PromiseIterator} promiseIterator 
 * @param {number} max 
 * @return {Promise}
 */
function ConcurrentController (promiseIterator, max){
    if(!promiseIterator[Symbol.iterator]){
        throw TypeError("promiseIterator must be an iterator");
    }
    let promiseArr = Array.from(promiseIterator);
    let len = promiseArr.length;

    let fulfilledCount = 0;

    // status[i] == -1 说明这个请求还没被resolve，== 0表示正在被处理，== 1表示处理成功
    let status = new Array(len).fill(-1);
    let ans = new Array(len).fill(0);

    // 当前请求的数量
    let count = 0;

    return new Promise((resolve, reject) => {
        for(let i=0; i<len; i++){
            solvePromise(promiseArr[i], i);
        }

         // 处理第index个promise
        function solvePromise(promise, index){
            // console.log(index, " count: ", count);

            // 全部的promise都完成了，这个promise被处理了，promise的并发数量超过了最大限制，就直接return
            if(fulfilledCount === len || count + 1 > max || status[index] !== -1) return;
            count += 1;
            // console.log(`处理第${index}个promise, count=${count}`);
            status[index] = 0;
            Promise.resolve(promise)
                .then((value) => {
                    count -= 1;
                    ans[index] = value;
                    status[index] = 1;
                    fulfilledCount += 1;

                    if(fulfilledCount === len) {
                        resolve(ans);
                    }
                    for(let j=0; j<len; j++){
                        solvePromise(promiseArr[j], j);
                    }
                })
                .catch((reason) => {
                    fulfilledCount = len;
                    reject(reason);
                });
        }
    });
}



let p1 = new Promise((res) =>  { setTimeout( () => { res(1)  }, 1000 ) }  );
let p2 = new Promise((res) =>  { setTimeout( () => { res(2)  }, 1000 ) }  );
let p3 = new Promise((res) =>  { setTimeout( () => { res(3)  }, 1000 ) }  );
let p4 = new Promise((res) =>  { setTimeout( () => { res(4)  }, 1000 ) }  );
let p5 = new Promise((res) =>  { setTimeout( () => { res(5)  }, 1000 ) }  );
let p6 = new Promise((res) =>  { setTimeout( () => { res(6)  }, 1000 ) }  );
let p7 = new Promise((res) =>  { setTimeout( () => { res(7)  }, 1000 ) }  );
let p8 = new Promise((res) =>  { setTimeout( () => { res(8)  }, 1000 ) }  );
let p9 = new Promise((res) =>  { setTimeout( () => { res(9)  }, 1000 ) }  );
let p10 = new Promise((res) => { setTimeout( () => { res(10) }, 1000 ) }  );
let p11 = new Promise((res) => { setTimeout( () => { res(11) }, 1000 ) }  );
let p12 = new Promise((res) => { setTimeout( () => { res(12) }, 1000 ) }  );
 
let arr = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

ConcurrentController(arr, 1).then((value) => {
    console.log(value);
});