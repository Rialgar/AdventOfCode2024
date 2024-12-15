import { add2D, readCharsFlat, readLines, readMap, sumArray } from "../utils.mjs";

const rootDir = "input";

(async () =>{

    const map = await readMap(rootDir + '/map');
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
        if(target.data === "O"){
            let boxTarget = target;
            while(boxTarget.data === 'O'){
                boxTarget = map.get(add2D(boxTarget, dir));
            }
            if(boxTarget.data === '#'){
                return;
            }
            if(boxTarget.data === '.'){
                map.set(boxTarget, 'O');
                map.set(target, '@');
                map.set(bot, '.');
                bot.x = target.x;
                bot.y = target.y;
                return;
            }
            throw new Error("Unkown map data: " + boxTarget.data);
        }
        throw new Error("Unkown map data: " + target.data);
    }

    for(let movement of movements){
        move(movement);
    }

    console.log(sumArray(map.findAll(v => v === 'O').map(location => location.x + location.y * 100)));
})();