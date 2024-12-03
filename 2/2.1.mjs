import {readLines} from '../utils.mjs'

(async () => {
    const lines = await readLines('./input');
    let count = 0;
    lines.forEach(line => {
        const levels = line.split(' ');
        const sign = Math.sign(levels[1]-levels[0]);
        for(let i = 1; i < levels.length; i++){
            const delta = levels[i]-levels[i-1];
            if(Math.sign(delta) != sign){
                return;
            }
            const abs = Math.abs(delta);
            if(abs < 1 || abs > 3){
                return
            }
        }
        count++;
    });
    console.log(count);
})();