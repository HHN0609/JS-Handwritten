/**
 * 深拷贝对象
 * @param {object} obj 
 */
function deepClone(obj){
    // obj不是对象，或者是null就直接返回
    if(obj === null || typeof obj !== "object"){
        return obj;
    }
    if(obj instanceof String || obj instanceof Number || obj instanceof Boolean){
        return new obj.constructor(obj.valueOf());
    }
    if(Array.isArray(obj)){
        let newArr = [];
        for(let item of obj){
            newArr.push(deepClone(item));
        }
        return newArr;
    } else {
        let newObj = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                let item = obj[key];
                newObj[key] = deepClone(item);
            }
        }
        return newObj;
    }
}

let person = {
    name: "hhn",
    age: 21,
    family: {
        father: "dad",
        mother: "mum",
        sister: "hmm"
    },
    indetification: [1, 2, 3, 4, 5, 6, 7],
    otherInfo: null
}

let _person = deepClone(person);
_person.family.father = "123";
_person.indetification[0] = 10000;
console.log(_person);
console.log(person);

