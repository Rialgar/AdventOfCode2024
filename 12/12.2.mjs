import { initMap, readMap, sub2D } from "../utils.mjs";

function collapse(sides, newSide){
    for(let i = 0; i < sides.length; i++){
        const side = sides[i];        
        if(
            side.direction.y === newSide.direction.y && side.direction.x === newSide.direction.x //borders are on the same side
        ){
            if(
                side.direction.y === 0 && //both borders are vertical
                side.x1 === newSide.x1 //borders are at the same column
            ){
                if(newSide.y2 === side.y1-1){
                    const combined = {
                        ...side,
                        y1: newSide.y1
                    }
                    sides.splice(i, 1);
                    return collapse(sides, combined);
                }
                if(newSide.y1 === side.y2+1){
                    const combined = {
                        ...side,
                        y2: newSide.y2
                    }
                    sides.splice(i, 1);
                    return collapse(sides, combined);
                }
            }
            if(
                side.direction.x === 0 && //both borders are horizontal
                side.y1 === newSide.y1 //borders are at the same column
            ){
                if(newSide.x2 === side.x1-1){
                    const combined = {
                        ...side,
                        x1: newSide.x1
                    }
                    sides.splice(i, 1);
                    return collapse(sides, combined);
                }
                if(newSide.x1 === side.x2+1){
                    const combined = {
                        ...side,
                        x2: newSide.x2
                    }
                    sides.splice(i, 1);
                    return collapse(sides, combined);
                }
            }
        }
    }
    sides.push(newSide);
    return sides;
}

(async () => {
    const map = await readMap('./input');
    map.fallback = '.'; //so that neighbours4 will return items outside the map so we can count borders correctly
    const done = initMap(map.width, map.height, false);
    
    let sum = 0;

    for(let location of map.iterate()){
        if(!done.get(location).data){
            done.set(location, true);
            const region = {
                fields: [location],
                sides: [],
                type: location.data
            };
            const unchecked = [location];
            while(unchecked.length > 0){
                const next = unchecked.shift();
                for(let neighbour of map.neighbours4(next)){
                    if(neighbour.data === location.data){
                        if(!done.get(neighbour).data){
                            done.set(neighbour, true);
                            region.fields.push(neighbour);
                            unchecked.push(neighbour);
                        }
                    } else {
                        collapse(region.sides, {
                            x1: next.x,
                            x2: next.x,
                            y1: next.y,
                            y2: next.y,
                            direction: sub2D(neighbour, next)
                        });
                    }
                }
            }
            console.log(region.type, region.fields.length, region.sides.length);
            sum += region.fields.length * region.sides.length;
        }
    }
    console.log(sum);
})()
