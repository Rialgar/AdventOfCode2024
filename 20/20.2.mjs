import { readMap } from "../utils.mjs";

(async () => {
    const map = await readMap('./input');

    const start = map.find(v => v === 'S');
    const end = map.find(v => v === 'E');
    
    map.set(end, 0);
    const todo = [end];
    while(todo.length > 0){
        const next = todo.shift();
        for(let candidate of map.neighbours4(next)){            
            if(candidate.data === '.' || candidate.data === 'S'){
                map.set(candidate, next.data + 1);
                todo.push(candidate);
            }
        }
    }

    const initial = map.get(start).data;

    console.log('initial', initial);

    todo.push(map.get(start));

    const key = ({x, y}) => `${x}:${y}`;

    let improvementsOver100 = 0;
    while(todo.length > 0){
        const next = todo.shift();
        for(let neighbor of map.neighbours4(next)){            
            if(neighbor.data !== '#' && neighbor.data < next.data) {
                todo.push(neighbor);
            }
        }
        const toCheck = [];
        const checked = {};
        toCheck.push({field: next, cheatLeft: 20});
        checked[key(next)] = true;
        while(toCheck.length > 0){
            const candidate = toCheck.shift();
            if(candidate.field.data !== '#'){
                const stepsCheated = (20 - candidate.cheatLeft);
                const improvement = next.data - stepsCheated - candidate.field.data;
                if(improvement >= 100){
                    improvementsOver100 += 1;
                }
            }
            if(candidate.cheatLeft > 0){
                for(let neighbor of map.neighbours4(candidate.field)){
                    if(!checked[key(neighbor)]){
                        toCheck.push({field: neighbor, cheatLeft: candidate.cheatLeft-1});
                        checked[key(neighbor)] = true;
                    }
                }
            }
        }
    }
    console.log(improvementsOver100);
})()
