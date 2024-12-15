import { add2D, readCharsFlat, readMap, scale2D, sumArray } from "../utils.mjs";

const rootDir = "input";

(async () =>{

    const map = await readMap(rootDir + '/map_doubled');
    const movements = await readCharsFlat(rootDir + '/movements');

    const bot = {...map.find(v => v === '@')};

    function movementToDir(movement){
        switch(movement){
            case '^':
                return {y:-1, x:0};
            case 'v':
                return {y:1, x:0};
            case '<':
                return {y:0, x:-1};
            case '>':
                return {y:0, x:1};
            default:
                throw new Error('unkown movement: ' + movement);
        }
    }

    function move(movement){
        const dir = movementToDir(movement);
        const target = map.get(add2D(bot, dir));
        if(target.data === '#'){
            return;
        }
        if(target.data === '.'){
            map.set(target, '@');
            map.set(bot, '.');
            bot.x = target.x;
            bot.y = target.y;
            return;
        }
        if(target.data === "[" || target.data === "]"){
            if(dir.y === 0){
                let toCheck = target;
                while(toCheck.data === '[' || toCheck.data === ']'){
                    toCheck = map.get(add2D(toCheck, scale2D(dir, 2)));                    
                }
                if(toCheck.data === '.'){
                    let toChange = toCheck;
                    while(toChange.x !== bot.x){
                        const next = map.get(add2D(toChange, scale2D(dir, -1)));
                        map.set(toChange, next.data);
                        toChange = next;
                    }
                    map.set(bot, '.');
                    bot.x = target.x;
                }
                return;
            }
            
            const boxes = [];
            if(target.data === "["){
                boxes.push(target);
            } else {
                boxes.push(map.get(target.x - 1, target.y));                
            }
            let boxesToCheck = [...boxes];
            while(boxesToCheck.length > 0){
                const nextBoxes = [];
                for(let box of boxesToCheck){
                    const boxTargetLeft = map.get(add2D(box, dir));
                    const boxTargetRight = map.get(add2D(boxTargetLeft, {x:1, y:0}));
                    if(boxTargetLeft.data === '#'){
                        return;
                    }
                    if(boxTargetRight.data === '#'){
                        return;
                    }                    
                    if(boxTargetLeft.data === ']') {
                        const nextBox = map.get(add2D(boxTargetLeft, {x: -1, y:0}));
                        //insert left so we can iterate farthest to closest easier later
                        boxes.unshift(nextBox); 
                        nextBoxes.push(nextBox);
                    } else if(boxTargetLeft.data === '[') {
                        boxes.unshift(boxTargetLeft); 
                        nextBoxes.push(boxTargetLeft);
                    }
                    if(boxTargetRight.data === '['){
                        boxes.unshift(boxTargetRight);
                        nextBoxes.push(boxTargetRight);
                    }
                }
                boxesToCheck = nextBoxes;
            }
            for(let box of boxes){
                const boxRight = add2D(box, {x:1, y:0})
                const newLeft = add2D(box, dir);
                const newRight = add2D(boxRight, dir);
                map.set(newLeft, '[');
                map.set(newRight, ']');
                map.set(box, '.');
                map.set(boxRight, '.');
            }
            map.set(target, '@');
            map.set(bot, '.');
            bot.y = target.y;
            return;
        }
        throw new Error("Unkown map data: " + target.data);
    }

    for(let movement of movements){
        move(movement);        
    }

    console.log(sumArray(map.findAll(v => v === '[').map(location => location.x + location.y * 100)));
})();