import { initMap, readMap } from "../utils.mjs";

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
                border: 0,
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
                        region.border += 1;
                    }
                }
            }
            console.log(region.type, region.fields.length, region.border);
            sum += region.fields.length * region.border;
        }
    }
    console.log(sum);
})()
