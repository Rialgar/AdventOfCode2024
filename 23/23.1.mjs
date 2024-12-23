import { insert, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    const nodes = new Map();
    const nodesWithT = new Set();

    for(let line of lines){
        const n1 = line.substring(0,2);
        const n2 = line.substring(3);
        if(!nodes.has(n1)){
            nodes.set(n1, {name: n1, connections: new Set()});
        }
        if(!nodes.has(n2)){
            nodes.set(n2, {name: n2, connections: new Set()});
        }
        const node1 = nodes.get(n1);
        const node2 = nodes.get(n2);
        node1.connections.add(node2);
        node2.connections.add(node1);
        if(n1.startsWith('t')){
            nodesWithT.add(node1);
        }
        if(n2.startsWith('t')){
            nodesWithT.add(node2);
        }
    }

    const found = new Set();

    for(let node of nodesWithT){
        const connections = Array.from(node.connections);
        for(let i=0; i+1<connections.length; i++){
            for(let j=i+1; j < connections.length; j++){
                if(connections[i].connections.has(connections[j])){
                    found.add([node.name, connections[i].name, connections[j].name].sort().join('-'));
                }
            }
        }
    }

    console.log(found.size);

})()
