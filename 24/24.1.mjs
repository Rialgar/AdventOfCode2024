import { leftPad, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('input');

    let untriggeredGates = [];
    const values = new Map();

    let readingInputs = true;
    for (let line of lines) {
        if(readingInputs){
            if (line === '') {
                readingInputs = false;
            } else {
                const match = line.match(/(x|y)([0-9]{2}): (0|1)/);
                values.set(match[1]+match[2], match[3] === '1');
            }
        } else {
            const match = line.match(/(.+) ([A-Z]+) (.+) -> (.+)/);
            untriggeredGates.push({
                in: [match[1], match[3]],
                out: match[4],
                operator: match[2],
                triggered: false
            });
        }
    }

    while(untriggeredGates.length > 0){
        untriggeredGates.forEach(gate => {
            if(values.has(gate.in[0]) && values.has(gate.in[1])){
                switch(gate.operator){
                    case 'AND':
                        values.set(gate.out, values.get(gate.in[0]) && values.get(gate.in[1]));
                        break;
                    case 'OR':
                        values.set(gate.out, values.get(gate.in[0]) || values.get(gate.in[1]));
                        break;
                    case 'XOR':
                        values.set(gate.out, values.get(gate.in[0]) !== values.get(gate.in[1]));
                        break;
                }
                gate.triggered = true;
            }
        });
        untriggeredGates = untriggeredGates.filter(g => !g.triggered);
    }
    let z = 0n;
    for(let i=0n; i<=46n; i++){
        console.log('z'+leftPad(i.toString(10), 2, '0'), values.get('z'+leftPad(i.toString(10), 2, '0')));
        if(values.get('z'+leftPad(i.toString(10), 2, '0'))){
            z += 1n << i;
        }
    }
    console.log(z);
})()
