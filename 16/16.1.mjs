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
    
    const path = a_star(map, start, end, {
        filter: fields => fields[0].data !== '#',
        cost: (next, fields) => {
            const lastDir = fields.length > 1 ? sub2D(fields[0], fields[1]) : east;
            const nextDir = sub2D(next, fields[0]);
            return (lastDir.x === nextDir.x && lastDir.y === nextDir.y) ? 1 : 1001;
        }
    });
    console.log(path.cost);
})()
