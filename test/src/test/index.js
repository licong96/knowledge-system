var canPlaceFlowers = function(flowerbed, n) {
    let num = 0;

    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0) {
            if (flowerbed[i - 1] !== 1 && flowerbed[i + 1] !== 1) {
                num++;
                i++;
            }
        }
    }
    return num === n;
};

const a = canPlaceFlowers([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 3);
console.log(a);