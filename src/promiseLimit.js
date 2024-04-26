// 这里要弄清楚Promise.all只是等待然后拿结果，并不主动发请求
/**
 * 
 * @param {Array<() => Promise<any>>} requestArr 
 * @param {number} limit 
 * @return {Promise<any>}
 */
function promiseLimit(requestArr, limit){
    // 这里记录index是为了保证结果数组里的顺序和入参是一致的
    const _requestArr = requestArr.map((request, index) => [index, request]);
    let done = 0; // 完成的promise
    let pending = 0; // 正在进行的promise
    let total = requestArr.length; // 总的需要完成的promise个数
    let ans = new Array(total).fill(0); // 存储答案的数组
 
    return new Promise((resolve) => {
        for(let i=0; i<limit; i++){
            beginRequest(..._requestArr.shift());
        }

        /**
         * @param {number} index
         * @param {() => Promise<any>} request
         */
        function beginRequest(index, request){
            if(pending+1 > limit) return;
            pending++;
            request().then((data) => {
                console.log(`${index}-fulfilled`);
                ans[index] = {state: "fulfilled", data};
            }).catch((reason) => {
                console.log(`${index}-rejected`);
                ans[index] = {state: "rejected", reason};
            }).finally(() => {
                done++;
                pending--;
                if(total === done){
                    resolve(ans);
                    return;
                }
                if(pending < limit && _requestArr.length) {
                    beginRequest(..._requestArr.shift());
                }
            });
        }
    });
}

/**
 * recommend， more simple
 * @param {Array<() => Promise<any>>} requestArr 
 * @param {number} limit 
 * @return {Promise<any>}
 */
function promiseLimitV2(requestArr, limit){
    return new Promise((resolve) => {
        const ans = new Array(requestArr.length).fill(0);
        const records = requestArr.map((req, index) => [ req, index ]);
        let doneCount = 0;
        for(let i=0; i<Math.min(requestArr.length, limit); i++) {
            start(...records.shift());
        }

        /**
         * 
         * @param {() => Promise<any>} request 
         * @param {number} index 
         */
        function start(request, index) {
            if(!request) return;
            console.log(`${index} - start`);
            request().then((value) => {
                ans[index] = value;
                console.log(`${index} - success`);
            }).catch((reason) => {
                ans[index] = reason;
                console.log(`${index} - fail`);
            }).finally(() => {
                doneCount++;
                if (doneCount === requestArr.length) {
                    resolve(ans);
                    return;
                }
                records.length && start(...(records.shift()));
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

promiseLimitV2(arr, 5).then((value) => {
    console.log(value);
});
