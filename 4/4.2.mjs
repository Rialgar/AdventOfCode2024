import { readMap, add2D, scale2D } from "../utils.mjs";

const word = 'MAS';
const intersect = 1;
const directions = [
    {x:1, y:-1},
    {x:1, y:1},
    {x:-1, y:-1},
    {x:-1, y:1}
];

(async () => {
    const map = await readMap('./input');

    let count = 0;

    const centers = map.findAll(char => char === word[intersect]);
    centers.forEach(center => {
        let subcount = 0;
        directions.forEach(dir => {
            const start = add2D(center, scale2D(dir, -intersect));
            const end = add2D(start, scale2D(dir, word.length-1));
            if(!map.has(start.x, start.y)){
                return;
            }
            if(!map.has(end.x, end.y)){
                return;
            }
            for(let i=0; i < word.length; i++){
                const next = add2D(start, scale2D(dir, i));
                if(map.get(next.x, next.y).data !== word[i]){
                    return;
                }
            }
            subcount++;
        });
        if(subcount > 1){
            count++;
        }
    });

    console.log(count);
})()
