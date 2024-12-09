import { initArray, readLines } from "../utils.mjs";

(async () => {
    const digits = ((await readLines('./input'))[0].split('')).map(c => parseInt(c));
    const numBlocks = digits.reduce((sum, next) => sum + next);

    const blocks = initArray(numBlocks, '.');
    let pointer = 0;
    let fileId = 0;
    let isFile = true;

    for(let digit of digits){
        if(isFile){
            for(let i = 0; i<digit; i++){
                blocks[pointer] = fileId;
                pointer++;
            }
            fileId++
        } else {
            pointer += digit;
        }
        isFile = !isFile;
    }

    let checkSum = BigInt(0);

    let startPointer = 0;
    let endPointer = blocks.length-1;
    while(startPointer < endPointer){
        if(blocks[startPointer] === '.'){
            blocks[startPointer] = blocks[endPointer];
            blocks[endPointer] = '.';
            while(blocks[endPointer] === '.'){
                endPointer--;
            }
        }
        checkSum = checkSum + BigInt(startPointer) * BigInt(blocks[startPointer]);
        startPointer++;
    }
    while(blocks[startPointer] != '.'){
        checkSum = checkSum + BigInt(startPointer) * BigInt(blocks[startPointer]);
        startPointer++;
    }
    console.log(checkSum);
})()
