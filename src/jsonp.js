/**
 * 
 * @param {string} url 
 * @param {object} params 
 * @param {string} callbackName 
 * @returns {Promise<any>}
 */
function jsonp(url, params, callbackName) {
    let dom = document.createElement("script");
    let strParams = '';
    for(let key in params){
        strParams += `${key}=${params[key]}&`;
    }
    strParams += `callback=${callbackName}`;
    return new Promise((resolve, reject) => {
        dom.src = url + '?' + strParams;
        // 挂载dom是一个异步任务，所以这个script被挂载并且执行的时候，window[callbackName]这个函数已经存在
        // 返回的script内容大致是:
        // getUserInfo({name: "kk", age: 21})
        // 被挂载后就会执行这个函数
        document.body.appendChild(dom);
        window[callbackName] = (data) => {
            resolve(data);
            document.removeChild(dom);
        }
    });
}