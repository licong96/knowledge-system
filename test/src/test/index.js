var canPlaceFlowers = function(flowerbed, n) {
    let index = 0;
    let num = 0;

    for (let i = 0; i < flowerbed.length; i++) {
        index = i;
        if (flowerbed[i] === 0) {
            if (flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
                num++;
                i = index + 1;
            }
        }
    }
    return num === n;
};

const a = canPlaceFlowers([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 3);
console.log(a);