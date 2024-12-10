import { readMap } from "../utils.mjs";

(async () => {
    const map = await readMap('./input', c => parseInt(c));
    const trailheads = map.findAll(data => data === 0);

    let sum = 0;
    for(let head of trailheads){
        let rating = 0;
        let paths = [[head]];
        while(paths.length > 0){
            const path = paths.shift();
            const end = path[path.length-1];
            for(let neighbor of map.neighbours4(end)){
                if(neighbor.data === end.data+1){
                    if(neighbor.data === 9){
                        const key = neighbor.x + ':' + neighbor.y;
                        rating += 1;
                    } else {
                        paths.push([...path, neighbor]);
                    }
                }
            }
        }
        sum += rating;
    }
    console.log(sum);
})()
