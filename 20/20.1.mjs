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

    let improvementsOver100 = 0;
    while(todo.length > 0){
        const next = todo.shift();
        for(let neighbor of map.neighbours4(next)){
            if(neighbor.data === '#'){
                for(let neighbor2 of map.neighbours4(neighbor)){
                    if(neighbor2.data != '#'){
                        const improvement = next.data - 2 - neighbor2.data;
                        if(improvement >= 100){
                            improvementsOver100 += 1;
                        }
                    }
                }
            } else if (neighbor.data < next.data) {
                todo.push(neighbor);
            }
        }
    }
    console.log(improvementsOver100);
})()
