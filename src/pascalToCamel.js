/**
 * use_name => useName
 * @param {string} pascalStr 
 * @return {string}
 */
function pascalToCamel(pascalStr){
    let arr = pascalStr.split("_");
    for(let i=1; i<arr.length; i++){
        arr[i] = arr[i][0].toLocaleUpperCase() + arr[i].slice(1);
    }
    return arr.join("");
}

console.log(pascalToCamel("use_name"));
