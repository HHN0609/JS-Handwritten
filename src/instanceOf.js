/**
 * 
 * @param {object} obj 
 * @param {Function} constructor 
 * @return {Boolean}
 */
function instanceOf (obj, constructor){
    let proto = Object.getPrototypeOf(obj);
    while(proto){
        if(proto.constructor === constructor) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}

let arr = []
console.log(Array instanceof Function);
console.log(instanceOf(Array, null));