import {readLines} from '../utils.mjs'

function check(levels){
    const sign = Math.sign(levels[1]-levels[0]);
    for(let i = 1; i < levels.length; i++){
        const delta = levels[i]-levels[i-1];
        if(Math.sign(delta) != sign){
            return false;
        }
        const abs = Math.abs(delta);
        if(abs < 1 || abs > 3){
            return false;
        }
    }
    return true;
}

(async () => {
    const lines = await readLines('./input');
    let count = 0;
    lines.forEach(line => {
        const levels = line.split(' ');
    
        if(check(levels)){
            count++;
        } else {
            for(let i = 0; i < levels.length; i++){
               if(check([...levels.slice(0,i), ...levels.slice(i+1)])){
                count++;
                return;
               }
            }
        }        
    });
    console.log(count);
})();