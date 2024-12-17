import path from "path";
import { readMap, east, a_star, sub2D } from "../utils.mjs";

(async () => {
    const map = await readMap('./input');
    const start = { ...
        map.find(v => v === 'S'),
        direction: east
    };
    const end = { ...
        map.find(v => v === 'E')
    };
    map.print();
    
    const paths = a_star(map, start, end, {
        filter: fields => fields[0].data !== '#',
        cost: (next, fields) => {
            const lastDir = fields.length > 1 ? sub2D(fields[0], fields[1]) : east;
            const nextDir = sub2D(next, fields[0]);
            return (lastDir.x === nextDir.x && lastDir.y === nextDir.y) ? 1 : 1001;
        },
        error_margin: 1000.5
    });
    const filteredPaths = paths.filter(p => paths[0].cost === p.cost);
    for(let path of filteredPaths){
        for(let field of path.fields){
            map.set(field, 'O');
        }
    }
    map.print();
    console.log(map.findAll(v => v === 'O').length);
})()
