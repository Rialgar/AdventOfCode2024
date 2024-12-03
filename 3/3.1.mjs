import {readLines} from '../utils.mjs'

(async () => {
    const lines = await readLines('./input');
    let sum = 0;
    lines.forEach(line => {
        const matches = line.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
        matches.forEach( match => {
            const nums = match.match(/[0-9]{1,3}/g);
            sum += parseInt(nums[0] * nums[1]);
        })
    })
    console.log(sum);
})();