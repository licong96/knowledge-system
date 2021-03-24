
var obj = {
    a: '1',
    b: {
        c: 2
    },
    d: {
        e: [1, 2, 3],
        f: {
            g: true
        }
    },
    h: function () {}
};

function clone(obj) {
    if (typeof obj === null) return null;
    if (typeof obj !== 'object') {
        return obj;
    }

    var newObj = {};

    if (Object.prototype.toString.call(obj) === '[object Array]') {
        newObj = [];
    }

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = clone(obj[key]);
        }
    }

    return newObj;
}

var obj2 = clone(obj);
console.log(obj)
console.log(obj2)

// obj2.d.e[1] = 4;

// console.log(obj)
// console.log(obj2)