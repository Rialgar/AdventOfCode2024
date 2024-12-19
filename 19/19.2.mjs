import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    const towels = lines[0].split(',').map(t => t.trim());
    const patterns = lines.slice(2);

    const cache = new Map();

    function count(pattern){
        if(cache.has(pattern)){
            return cache.get(pattern);
        }
        if(pattern.length === 0){
            return 1;
        }
        let sum = 0;
        for(let towel of towels){
            if(pattern.startsWith(towel)){
                sum += count(pattern.substr(towel.length));
            }
        }
        cache.set(pattern, sum);
        return sum;
    }

    let sum = 0, i=0;
    for(let pattern of patterns){        
        sum += count(pattern);
        i++;
    }
    console.log(sum);
})()
