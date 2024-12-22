import { readLines } from "../utils.mjs";

// all the constants in the algorithm are powers of 2
// 64 is 2 ^^ 6 -> * 64 is << 6
// 32 is 2 ^^ 5 -> / 32 is >> 5
// 2048 is 2^^11 -> * 2024 is << 11
// 16777216 is 2 ^^ 24 -> % 16777216 is & 16777215 (a sequence of 23 1 bits)

function step(seed){
    seed = (seed ^ (seed << 6)) & 16777215; // times 64, mix, prune
    seed = (seed ^ (seed >> 5)) & 16777215; // divide by 32, mix, prune
    seed = (seed ^ (seed << 11)) & 16777215; // times 2028, mix, prune
    return seed;
}

(async () => {
    const lines = await readLines('./input');
    
    let sum = 0;
    for(let line of lines){
        let seed = parseInt(line);
        for(let i = 0; i < 2000; i++){
            seed = step(seed);
        }
        sum += seed;
    }
    console.log(sum);
})()
