// 这里要弄清楚Promise.all只是等待然后拿结果，并不主动发请求

/**
 * 并发控制器，限制最大同时请求数量
 * @param {Array<() => Promise>} requestArr 
 * @param {number} max 
 * @return {Promise}
 */
function ConcurrentController (requestArr, max){
    if(!Array.isArray(requestArr)){
        throw TypeError("requestArr must be an array");
    }
    let totalRequests = requestArr.length;
    
    // 已经完成(拿到结果)的请求的数量
    let fulfilledCount = 0;

    // 当前(正在)请求的数量
    let requestingCount = 0;

    // status[i] == -1 说明这个请求还没被resolve，== 0表示正在被处理，== 1表示处理成功
    let status = new Array(totalRequests).fill(-1);

    // 结果数组
    let ans = new Array(totalRequests).fill(0);

    return new Promise((resolve, reject) => {
        for(let i=0; i<totalRequests; i++){
            solvePromise(requestArr[i], i);
        }

         // 处理第index个request
        function solvePromise(request, index){
            // 全部的request都完成了 or 这个request被处理了 or request的并发数量超过了最大限制，就直接return
            if(fulfilledCount === totalRequests || requestingCount + 1 > max || status[index] !== -1) return;
            requestingCount += 1;
            status[index] = 0;

            console.log(`处理第${index}个request, requestingCount=${requestingCount}`);
            
            // 这里后面的then并不会接收到一个promise，因为Promise.resolve()在嵌套的时候会自动解包
            // 直接用request()也是可以的
            Promise.resolve(request())
                .then((value) => {
                    requestingCount -= 1;
                    ans[index] = value;
                    status[index] = 1;
                    fulfilledCount += 1;

                    if(fulfilledCount === totalRequests) {
                        resolve(ans);
                    }
                    for(let j=0; j<totalRequests; j++){
                        solvePromise(requestArr[j], j);
                    }
                })
                .catch((reason) => {
                    fulfilledCount = totalRequests;
                    reject(reason);
                });
        }
    });
}

// 优化后的并发控制器，时间复杂度降低
function ConcurrentController2(requestArr, max = 5) {
    if(Array.isArray(requestArr) === false) {
        throw new TypeError("first parameter must be an Array");
    }
    if(Number.isInteger(max) === false){
        throw new TypeError("second parameter must be an Intaget");
    }
    let totalCount = requestArr.length;
    let fulfilledCount = 0;
    let requestingCount = 0;
    let ans = new Array(totalCount).fill(0);
    let requests = Array.prototype.map.call(requestArr, (request, index) => {
        return [ request, index ];
    });
    return new Promise((resolve, reject) => {
        // 这个ableCount是剩下得能够发送的请求空闲余量
        let ableCount = max - requestingCount;
        // 这里用了Min函数是为了防止越界
        for(let i=0; i<Math.min(ableCount, totalCount); i++){
            beginRequest(...(requests.shift()));
        }

        function beginRequest(request, index){
            if(requestingCount + 1 > max || fulfilledCount === totalCount) return;
            requestingCount += 1;
            console.log(`处理了第${index}个请求`);
            Promise.resolve(request()).then((value) => {
                ans[index] = value;
                requestingCount -= 1;
                fulfilledCount += 1;
                if(fulfilledCount === totalCount){
                    resolve(ans);
                }

                // 这个ableCount是剩下得能够发送的请求空闲余量
                let ableCount = max - requestingCount;
                let restRequetCount = requests.length;
                for(let i=0; i<Math.min(ableCount, restRequetCount); i++){
                    beginRequest(...requests.shift());
                }
                
            }).catch((reason) => {
                reject(reason);
            });
        }
    });
}


let p1 =  () => new Promise((res) =>  { setTimeout( () => { res(1)  }, 5000 ) }  );
let p2 =  () => new Promise((res) =>  { setTimeout( () => { res(2)  }, 1000 ) }  );
let p3 =  () => new Promise((res, rej) =>  { setTimeout( () => { rej(3)  }, 1000 ) }  );
let p4 =  () => new Promise((res) =>  { setTimeout( () => { res(4)  }, 1000 ) }  );
let p5 =  () => new Promise((res) =>  { setTimeout( () => { res(5)  }, 1000 ) }  );
let p6 =  () => new Promise((res) =>  { setTimeout( () => { res(6)  }, 5000 ) }  );
let p7 =  () => new Promise((res) =>  { setTimeout( () => { res(7)  }, 1000 ) }  );
let p8 =  () => new Promise((res) =>  { setTimeout( () => { res(8)  }, 1000 ) }  );
let p9 =  () => new Promise((res) =>  { setTimeout( () => { res(9)  }, 1000 ) }  );
let p10 = () => new Promise((res) => { setTimeout( () => { res(10) }, 1000 ) }  );
let p11 = () => new Promise((res) => { setTimeout( () => { res(11) }, 1000 ) }  );
let p12 = () => new Promise((res) => { setTimeout( () => { res(12) }, 1000 ) }  );
 
let arr = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

ConcurrentController2(arr, 1).then((value) => {
    console.log(value);
});
