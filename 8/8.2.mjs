import { add2D, initMap, largest_common_divider, readMap, scale2D } from "../utils.mjs";

(async () => {
    const map = await readMap('./input');
    const antennasByFrequency = {};
    for (let antenna of map.findAll(data => data != '.')){
        if(!antennasByFrequency[antenna.data]){
            antennasByFrequency[antenna.data] = [];
        }
        antennasByFrequency[antenna.data].push(antenna);
    }

    const result = initMap(map.width, map.height, '.');
    for (let antennas of Object.values(antennasByFrequency)){
        for(let a = 0; a < antennas.length; a++){
            for(let b = a+1; b < antennas.length; b++){
                const first = antennas[a];
                const second = antennas[b];

                let step = add2D(first, scale2D(second, -1));
                const lcd = largest_common_divider(Math.abs(step.x), Math.abs(step.y));
                step = scale2D(step, 1/lcd);

                let location = first;
                while(map.has(location)){
                    result.set(location, '#');
                    location = add2D(location, step)
                }

                step = scale2D(step, -1);
                location = add2D(first, step);
                while(map.has(location)){
                    result.set(location, '#');
                    location = add2D(location, step)
                }
            }
        }
    }
    console.log(result.findAll(data => data === '#').length);
})()
