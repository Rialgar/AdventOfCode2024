import { readMap } from "../utils.mjs";

(async () => {
    const map = await readMap('./input', c => parseInt(c));
    const trailheads = map.findAll(data => data === 0);

    let sum = 0;
    for(let head of trailheads){
        let score = 0;
        let paths = [[head]];
        let reached = new Set();
        while(paths.length > 0){
            const path = paths.shift();
            const end = path[path.length-1];
            for(let neighbor of map.neighbours4(end)){
                if(neighbor.data === end.data+1){
                    if(neighbor.data === 9){
                        const key = neighbor.x + ':' + neighbor.y;
                        if(!reached.has(key)){
                            score += 1;
                            reached.add(key)
                        }
                    } else {
                        paths.push([...path, neighbor]);
                    }
                }
            }
        }
        sum += score;
    }
    console.log(sum);
})()
