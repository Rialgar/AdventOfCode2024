const example = [125, 17];
const input = [0, 7, 198844, 5687836, 58, 2478, 25475, 894];


function step(arr){
    const result = [];
    for(let stone of arr){
        if(stone === 0){
            result.push(1);
        } else if (stone.toString().length % 2 === 0){
            const str = stone.toString();
            result.push(parseInt(str.substring(0, str.length/2)));
            result.push(parseInt(str.substring(str.length/2, str.length)));
        } else {
            result.push(stone * 2024);
        }
    }
    return result;
}

let stones = input;
for(let i = 0; i < 25; i++){
    stones = step(stones);
}
console.log(stones.length);