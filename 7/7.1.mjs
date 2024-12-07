import { readLines } from "../utils.mjs";

const operatorOptions = [
    (a,b) => a+b,
    (a,b) => a*b
]

function check(result, operands){
    if(operands.length === 1){
        return result === operands[0];
    }

    for(let operator of operatorOptions){
        if(check(result, [operator(operands[0], operands[1]), ...operands.slice(2)])){
            return true;
        }
    }
}

(async () => {
    const lines = await readLines('./input');
        
    let sum = 0;
    for(let line of lines){
        const firstSplit = line.split(':');
        const secondSplit = firstSplit[1].trim().split(' ');
        const result = parseInt(firstSplit[0]);
        const operands = secondSplit.map(num => parseInt(num));
        if(check(result, operands)){
            sum += result;
        }
    }
    console.log(sum);
})()
