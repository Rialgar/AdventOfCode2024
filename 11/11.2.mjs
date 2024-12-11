import { initArray, sumArray } from "../utils.mjs";

const example = [125, 17];
const input = [0, 7, 198844, 5687836, 58, 2478, 25475, 894];

let cache = new Map();

function count(stone, steps){
    if(steps == 0){
        return 1;
    }

    const cacheKey = `${stone},${steps}`;
    if(cache.has(cacheKey)){
        return cache.get(cacheKey);
    }

    let result;
    if(stone === 0){
        result = count(1, steps-1);
    } else if (stone.toString().length % 2 === 0){
        const str = stone.toString();
        const left = parseInt(str.substring(0, str.length/2));
        const right = parseInt(str.substring(str.length/2, str.length));
        result = count(left, steps-1) + count(right, steps-1);
    } else {
        result = count(stone * 2024, steps-1);
    }
    cache.set(cacheKey, result);
    return result;
}

//populate cache
for(let i = 0; i < 75; i++){
    count(0,i);
}
console.log(sumArray(input.map(stone => count(stone,75))));
