import { readMap, add2D, scale2D } from "../utils.mjs";

const word = 'XMAS';
const directions = [
    {x:1, y:-1},
    {x:1, y:0},
    {x:1, y:1},
    {x:0, y:-1},
    {x:0, y:0},
    {x:0, y:1},
    {x:-1, y:-1},
    {x:-1, y:0},
    {x:-1, y:1}
];

(async () => {
    const map = await readMap('./input');

    let count = 0;

    const starts = map.findAll(char => char === word[0]);
    starts.forEach(start => {
        directions.forEach(dir => {
            const end = add2D(start, scale2D(dir, word.length-1));
            if(!map.has(end.x, end.y)){
                return;
            }
            for(let i=1; i < word.length; i++){
                const next = add2D(start, scale2D(dir, i));
                if(map.get(next.x, next.y).data !== word[i]){
                    return;
                }
            }

            count++;
        });
    });

    console.log(count);
})()
