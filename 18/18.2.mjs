import { a_star, initMap, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    const map = initMap(71, 71, '.');
    
    let i;
    for(i = 0; i < 1024; i++){
        const coords = lines[i].split(',').map(v => parseInt(v));
        map.set(coords[0], coords[1], '#');
    }

    let path = a_star(map, {x:0, y:0}, {x: map.width-1, y: map.height-1}, {
        filter: fields => fields[0].data !== '#',
        print: false,
    });
    let nextCoords;
    while(path && i < lines.length){
        console.log(i, lines.length);
        nextCoords = lines[i].split(',').map(v => parseInt(v));
        map.set(nextCoords[0], nextCoords[1], '#');
        if(path.fields.some(f => f.x === nextCoords[0] && f.y === nextCoords[1])){
            path = a_star(map, {x:0, y:0}, {x: map.width-1, y: map.height-1}, {
                filter: fields => fields[0].data !== '#',
                print: false,
            });
        }
        i++;
    }
    console.log(i < lines.length, nextCoords.join(','));
})()
