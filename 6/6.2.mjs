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
        return {wasTurn: false, location: false};
    }
    const next = map.get(nextPos);
    if(next.data === '#'){
        return {
            wasTurn: true,
            location: turnRight(map, current)
        };
    }
    return {
        wasTurn: false,
        location: map.set(next, direction)
    };
};

async function check(x, y) {
    const knownTurns = new Set();
    const map = await readMap('./input');
    if(map.get(x, y).data !== '.'){
        return false;
    }
    const start = {... map.find(data => data === '^')};
    map.set(x, y, '#');

    let numSteps = 0;
    let current = start;
    current = step(map, current).location;
    while(current){
        const stepTaken = step(map, current);
        if(stepTaken.wasTurn){
            const key = `${stepTaken.location.x}:${stepTaken.location.y}:${stepTaken.location.data}`;            
            if(knownTurns.has(key)){
                return true;
            }
            knownTurns.add(key);
        }
        current = stepTaken.location;
        numSteps++;
        if(numSteps > 50000000){
            console.log(x, y);
            map.print();
            process.exit();
        }
    };
    return false;
}

(async ()=>{
    const map = await readMap('./input');
    let count = 0;
    for (let x = 0; x < map.width; x++) {
        console.log(`${x}/${map.width}`);
        for (let y = 0; y < map.height; y++) {
            if(await check(x, y)){
                count++;
            }
        }
    }
    console.log(count);
})()