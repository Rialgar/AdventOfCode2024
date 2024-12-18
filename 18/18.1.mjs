import { a_star, initMap, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    const map = initMap(71, 71, '.');
    
    for(let i = 0; i < 1024; i++){
        const coords = lines[i].split(',').map(v => parseInt(v));
        map.set(coords[0], coords[1], '#');
    }

    const path = a_star(map, {x:0, y:0}, {x: map.width-1, y: map.height-1}, {
        filter: fields => fields[0].data !== '#'
    });
    for(let field of path.fields){
        map.set(field, 'O');
    }
    map.print();
    console.log(path.cost);
})()
