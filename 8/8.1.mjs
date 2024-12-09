import { add2D, initMap, readMap, scale2D } from "../utils.mjs";

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

                const left = add2D(scale2D(first, 2), scale2D(second, -1));
                if(result.has(left)){
                    result.set(left, '#');
                }

                const right = add2D(scale2D(second, 2), scale2D(first, -1));
                if(result.has(right)){
                    result.set(right, '#');
                }
                
            }
        }
    }
    console.log(result.findAll(data => data === '#').length);
})()
