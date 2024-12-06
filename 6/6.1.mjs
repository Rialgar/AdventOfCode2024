import { add2D, readMap } from "../utils.mjs";

function getDir(arrow){
    switch(arrow){
        case '^':
            return {x:0, y:-1}
        case '>':
            return {x:1, y:0}
        case 'v':
            return {x:0, y:1}
        case '<':
            return {x:-1, y:0}
        default:
            console.error('unknown direction character: ' + arrow);
    }
}

function turnRight(map, current){
    switch(current.data){
        case '^':
            return map.set(current, '>');
        case '>':
            return map.set(current, 'v');
        case 'v':
            return map.set(current, '<');
        case '<':
            return map.set(current, '^');
    }
}

function step(map, current){
    const direction = current.data;
    const nextPos = add2D(current, getDir(direction));
    if(!map.has(nextPos)){
        return false;
    }
    const next = map.get(nextPos);
    if(next.data === '#'){
        const out = turnRight(map, current);
        //map.print();
        //console.log("===")
        return out;
    }
    return map.set(next, direction);
};

(async () => {
    const map = await readMap('./input');
    const start = {... map.find(data => data === '^')};
    
    let current = start;
    current = step(map, current);
    while(current){
        if((current.x === start.x && current.y === start.y && current.data === '^')){
            console.log('loop!');
            console.log(map.findAll(data => data === 'X').length + 1);
            return;
        }
        current = step(map, current);
    };
    //map.print();
    console.log(map.findAll(data => data !== '.' && data !== '#').length);
})()
