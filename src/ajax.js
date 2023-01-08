/**
 * 简单地用Promise对XMLHttpRequest的封装
 * @param {string} url 
 * @param {string} method 
 * @param {object} data 
 * @return {Promise<any>}
 */
function ajax (url, method, data){
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange(() => {
            if(xhr.readyState === 4 && xhr.status === 200){
                resolve(xhr.responseText);
            } else {
                reject(xhr.responseText);
            }
        });
    
        xhr.send(method === "POST" ? JSON.stringify(data) : null);
    });
}
