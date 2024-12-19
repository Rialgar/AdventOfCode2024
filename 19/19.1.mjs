import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    const towels = lines[0].split(',').map(t => t.trim());
    const patterns = lines.slice(2);

    const cache = new Map();

    function check(pattern){
        if(cache.has(pattern)){
            return cache.get(pattern);
        }
        if(pattern.length === 0){
            return true;
        }
        for(let towel of towels){
            if(pattern.startsWith(towel) && check(pattern.substr(towel.length))){
                cache.set(pattern, true);
                return true;
            }
        }
        cache.set(pattern, false);
        return false;
    }

    let count = 0;
    for(let pattern of patterns){        
        if(check(pattern)){
            count++;
        }
    }
    console.log(count);
})()
