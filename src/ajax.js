/**
 * 简单的对XMLHttpRequest的封装
 * @param {string} url 
 * @param {string} method 
 * @param {Function} callback 
 */
function ajax (url, method, callback){
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.send();

    xhr.onreadystatechange((e) => {
        
    })
}
