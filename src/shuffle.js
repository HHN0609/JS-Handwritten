/**
 * 洗牌算法
 * @param {number[]} arr
 * @return {number[]} 
 */
function shuffle(arr) {
    let len = arr.length;
    for(let i=0; i<len; i++){
        let a = Math.floor(Math.random() * len);
        if(a !== i){
            [arr[a], arr[i]] = [arr[i], arr[a]];
        }
    }
    return arr;
}

console.log(shuffle([4, 2, 5, 6, 1, 4, 6]));
