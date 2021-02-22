/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function(deck) {
    const arr = deck.sort((a, b) => a - b); // 排序
    let min = Number.MAX_SAFE_INTEGER;    // 记录最小份
    let result = false;
    let safe = [];

    console.log('arr', arr)
    
    for (let i = 0, leng = arr.length, tem = []; i < leng; i++) {
        tem.push(arr[i]);
        
        for (let j = i + 1; j < leng - 1; j++) {
            console.log(arr[i], arr[j])
            if (arr[i] === arr[j]) {
                tem.push(arr[j]);
            } else {
                if (min > tem.length) {
                    min = tem.length;
                }
                safe.push([].concat(tem));
                tem.length = 0;
                i = j;
                break;
            }
        }
    }

    console.log('safe', safe)

    safe.every(item => {
        if (item.length % min !== 0) {
            result = false;
            return false;
        }
    });

    return result;

};


// console.log(hasGroupsSizeX([1,1,1,2,2,2,3,3]))
console.log(hasGroupsSizeX([1,1,2,2,3,3]))