/**
 * 解析url的query参数
 * @param {string} url 
 * @return {object}
 */
function urlReolveParams(url){
    let queryPairs = url.split("?")[1];
    if(!queryPairs) return {};
    queryPairs = queryPairs.split("&").map((k_v) => {
        return k_v.split("=");
    })
    return Object.fromEntries(queryPairs);
}

console.log(urlReolveParams("https://www.tuhu.com?name=hehaonan&id=19063217"));