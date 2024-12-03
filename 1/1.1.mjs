import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    const left = [];
    const right = [];

    lines.forEach(line => {
        const [l,r] = line.split(' ').filter(Boolean);
        left.push(parseInt(l));
        right.push(parseInt(r));
    });
    left.sort();
    right.sort();
    let sum = 0;
    for(let i=0; i<left.length; i++){
        sum += Math.abs(left[i]-right[i]);
    }
    console.log(sum);
})()
