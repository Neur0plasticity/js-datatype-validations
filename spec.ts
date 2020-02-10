import { DType } from "./main";

let datatypes = {
    "boolean":  Boolean(),
    "string":   String(),
    "number":   Number(),
    "object":   Object(),
    "array":    Array(),
    "symbol":   Symbol(),
    "undefined": undefined,
    "null":     null,
    "function": new Function()
};
for (let k in datatypes) {
    for (let n in datatypes) {
        (DType["_"+k](datatypes[n]) === (n === k)) || (e=>{throw new Error()})()
    }
}




