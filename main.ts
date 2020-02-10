const _dType = function(func,obj){    
    for (let k in obj) {
        const func2 = obj[k];
        obj[k] = function(v) {
            return func(v) && func2(v);
        };
    }
    return Object.assign(func,obj);
};
const _boolean = [(v => typeof v === "boolean"),
        {
            isTrue:      v => v === true,
            isFalse:     v => v === false
        }
];
const _number = [(v => typeof v === "number"),
        {
            isSafe:       v => Number.isSafeInteger(v),
            isInfinity:   v => v === Infinity,
            isFinite:     v => Number.isFinite(v),
            isMaxValue:   v => v === Number.MAX_VALUE,
            isNaN:        v => Number.isNaN(v),
            isPositive:   v => 0 < v,
            isNegative:   v => 0 > v,
            isZero:       v => v === 0,
            isFloat:      v => String(v).includes(".")
        }
];
const _lowerCase = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z"];
const _upperCase = _lowerCase.map(v => v.toUpperCase());
const _string = [(v => typeof v === "string"),
        {
            isEmpty:      v => v.length === 0,
            isNotEmpty:   v => v.length !== 0,
            isAlpha:      v => [..._lowerCase,..._upperCase].includes(v),
        }
];
const _object = [(v => !Array.isArray(v) && typeof v === "object"),
        {
            isEmpty:      v => Object.keys(v).length === 0,
            isNotEmpty:   v => Object.keys(v).length !== 0             
        }
];
const _array = [(v => Array.isArray(v)),
        {
            isEmpty:      v => v.length === 0,
            isNotEmpty:   v => v.length !== 0
        }
];
const _symbol = [(v => typeof v === "symbol"),
        {

        }
];
const _function = [(v => typeof v === "function"),
        {
            isThis:       v => v.name,
            isAnon:       v => v,
            isLambda:     v => v,
            isEmpty:      v => v.toString().
        }
];
const _class = [(v => typeof v === "function"),
        {
            isEmpty,
            
        }
];
const _undefined = [];
const _null = [];

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