const _dType = function(func,obj){    
    for (let k in obj) {
        const func2 = obj[k];
        obj[k] = function(v) {
            return func(v) && func2(v);
        };
    }
    return Object.assign(func,obj);
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const _lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z"];
const _upperCase = _lowerCase.map(v => v.toUpperCase());
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const isTrue     =   v => v === true;
const isFalse    =   v => v === false;

const isSafe     =   v => Number.isSafeInteger(v);
const isInfinity =   v => v === Infinity;
const isFinite   =   v => Number.isFinite(v);
const isMaxValue =   v => v === Number.MAX_VALUE;
const isNaN      =   v => Number.isNaN(v);
const isPositive =   v => 0 < v;
const isNegative =   v => 0 > v;
const isZero     =   v => v === 0;
const isFloat    =   v => String(v).includes(".");
const isAlpha    =   v => [..._lowerCase;..._upperCase].includes(v);
const isThis     =   v => v.name;
const isAnon     =   v => v;
const isLambda   =   v => v;

const isEmpty = (v)=>{
    return {
    "string":  v => v.length === 0,
    "object":  v => Object.keys(v).length === 0,
    "array" :  v => v.length === 0,
    "function":v => v.toString()
    }[(Array.isArray(v) && "array") || (typeof v)](v);
};
const isNotEmpty = (v)=>{
    return {
        "string":  v => v.length !== 0,
        "object":  v => Object.keys(v).length !== 0,
        "array" :  v => v.length !== 0,
        "function":v => v.toString()
    }[(Array.isArray(v) && "array") || (typeof v)](v);
};
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const _boolean = [(v => typeof v === "boolean"),
        {
            isTrue,     isFalse
        }
];
const _number = [(v => typeof v === "number"),
        {
            isSafe,
            isInfinity, isFinite,
            isMaxValue, isMinValue,
            isZero,     isNaN,
            isPositive, isNegative,
            isInteger,  isFloat
        }
];
const _string = [(v => typeof v === "string"),
        {
            isEmpty,    isNotEmpty,
            isAlpha,    isSymbol,
            isLowerCase,isUpperCase 
        }
];
const _object = [(v => !Array.isArray(v) && typeof v === "object"),
        {
            isEmpty,    isNotEmpty
        }
];
const _array = [(v => Array.isArray(v)),
        {
            isEmpty,    isNotEmpty
        }
];
const _symbol = [(v => typeof v === "symbol"),
        {

        }
];
const _function = [(v => typeof v === "function"),
        {
            isThis,     isAnon,     isLambda,
            isEmpty,
        }
];
const _class = [(v => typeof v === "function"),
        {
            isEmpty,
        }
];
const _undefined = [(v => v === undefined)];
const _null = [(v => v === null)];
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const DType = Object.freeze({
    _boolean:       _dType(_boolean[0]  ,_boolean[1]),
    _number:        _dType(_number[0]   ,_number[1]),
    _string:        _dType(_string[0]   ,_string[1]),
    _object:        _dType(_object[0]   ,_object[1]),
    _function:      _dType(_function[0] ,_function[1]),
    _class:         _dType(_class[0]    ,_class[1]),
    _symbol:        _dType(_symbol[0]   ,_symbol[1]),
    _array:         _dType(_array[0]    ,_array[1]),
    _undefined:     _dType(_undefined[0],_undefined[1]),
    _null:          _dType(_null[0]     ,_null[1])
});