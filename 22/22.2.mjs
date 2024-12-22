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

class Queue4 {
    contents = [];

    get filled(){
        return this.contents.length > 3;
    }

    push(entry){
        if(!this.filled){
            this.contents.push(entry);
        } else {
            this.contents[0] = this.contents[1];
            this.contents[1] = this.contents[2];
            this.contents[2] = this.contents[3];
            this.contents[3] = entry;
        }
    }
}

function arrayEq(a, b) {
    return a.every((v, i) => v === b[i]);
}

function getPrice(startSeed, sequence){
    let seed = startSeed;
    let lastPrice = seed % 10;
    const queue = new Queue4();
    for(let i = 0; i < 2000; i++){
        seed = step(seed);
        const nextPrice = seed % 10;
        const change = nextPrice - lastPrice;
        queue.push(change);
        if(queue.filled && arrayEq(sequence, queue.contents)){
            return nextPrice;
        }
        lastPrice = nextPrice;
    }
    return 0;
}

function isPossible(sequence){
    for(let i = 0; i < 3; i ++){
        const sum = sequence[i] + sequence[i+1];
        if(sum < -9 || sum > 9){
            return false;
        }
    }
    const sum31 = sequence[0] + sequence[1] + sequence[2];
    if(sum31 < -9 || sum31 > 9){
        return false;
    }
    const sum32 = sequence[1] + sequence[2] + sequence[3];
    if(sum32 < -9 || sum32 > 9){
        return false;
    }
    const sum4 = sequence[0] + sequence[1] + sequence[2] + sequence[3];
    if(sum4 < -9 || sum4 > 9){
        return false;
    }
    return true;
}

function stepSequence(sequence){
    for(let i = 0; i < 4; i++){
        if(sequence[i] < 9){
            sequence[i] += 1;
            return false;
        } else {
            sequence[i] = -9;
        }
    }
    return true;
}

(async () => {
    const lines = (await readLines('./input')).map(line => parseInt(line));
    
    let max = 0;
    const sequence = [-9, -9, -9, -9]
    do {
        if(isPossible(sequence)){
            console.log(sequence);
            let sum = 0;
            for(let seed of lines){
                const price = getPrice(seed, sequence);
                sum += price;
            }
            if(sum > max){
                max = sum;
            }
        }
    } while (!stepSequence(sequence));
    console.log(max);
})()
