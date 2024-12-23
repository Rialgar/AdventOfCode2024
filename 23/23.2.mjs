import { insert, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    const nodes = new Map();

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
    }

    const histogram = []
    const triples = new Map();
    for(let node of nodes.values()){
        const connections = Array.from(node.connections);
        for(let i=0; i+1<connections.length; i++){
            for(let j=i+1; j < connections.length; j++){
                if(connections[i].connections.has(connections[j])){
                    const key = [node.name, connections[i].name, connections[j].name].sort().join(',');
                    if(!triples.has(key)){
                        triples.set(key, [node, connections[i], connections[j]]);
                    }
                }
            }
        }
    }
    let last = triples;
    let current = triples;
    while(current.size > 0){
        console.log(current.size);
        last = current;
        current = new Map();
        const failed = new Set();
        for(let cluster of last.values()){
            for(let node of cluster){
                conLoop: for(let con of node.connections){
                    if(cluster.indexOf(con) < 0){
                        const candidate = [...cluster, con];
                        const key = candidate.map(n => n.name).sort().join(',');
                        if(!current.has(key) && !failed.has(key)){
                            for(let node2 of cluster){
                                if(!node2.connections.has(con)){
                                    failed.add(key);
                                    break conLoop;
                                }
                            }
                            current.set(key, candidate);
                        }
                    }
                }
            }
        }
    }
    console.log(last);
})()
