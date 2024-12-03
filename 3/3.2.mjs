import {readLines} from '../utils.mjs'

(async () => {
    const lines = await readLines('./input');
    let sum = 0;
    let enabled = true;
    lines.forEach(line => {
        const instructions = line.match(/(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/g);
        instructions.forEach( instruction => {
            if(instruction === 'do()'){
                enabled = true;
            } else if(instruction === "don't()"){
                enabled = false;
            } else if(enabled){
                const nums = instruction.match(/[0-9]{1,3}/g);
                sum += parseInt(nums[0] * nums[1]);
            }
        })
    })
    console.log(sum);
})();