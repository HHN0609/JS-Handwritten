/**
 * 
 * @param {string} camelStr 
 * @return {string}
 */
function camelToPascal(camelStr){
    let arr = [];
    let temp = "";
    for(let i=0; i<camelStr.length; i++){
        if(camelStr[i] >= "A" && camelStr[i] <= "Z"){
            temp && arr.push(temp);
            temp = camelStr[i].toLocaleLowerCase();
        } else {
            temp += camelStr[i];
        }
    }
    arr.push(temp);
    return arr.join("_");
}

console.log(camelToPascal("useName"));