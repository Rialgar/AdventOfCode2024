import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('input');

    // did this manually by gradually replacing variable names with readable ones and adding swaps as I identified them

    let readingInputs = true;
    let renamedProgram = '';
    for (let line of lines) {
        if(readingInputs){
            if (line === '') {
                readingInputs = false;
            }
        } else {
            renamedProgram += line;
            renamedProgram += '\n';
        }
    }

    const swaps = [
        ['mdd', 'z19'],
        ['wpd', 'z11'],
        ['wts', 'z37'],
        ['jqf', 'skh']
    ];

    for(let swap of swaps){
        renamedProgram = renamedProgram.replaceAll('-> '+swap[0], 'temp');
        renamedProgram = renamedProgram.replaceAll('-> '+swap[1], '-> '+swap[0]);
        renamedProgram = renamedProgram.replaceAll('temp', '-> '+swap[1]);
    }

    let match;
    // x AND y
    while(match = renamedProgram.match(/(x|y)([0-9]{2}) AND (x|y)([0-9]{2}) -> ([a-z]{3})/)) {
        if(match[2] === '00'){
            renamedProgram = renamedProgram.replaceAll(match[5], 'c' + match[2]);
        } else {
            renamedProgram = renamedProgram.replaceAll(match[5], 'c' + match[2] + "_0");
        }

    }
    // x XOR y
    while(match = renamedProgram.match(/(x|y)([0-9]{2}) XOR (x|y)([0-9]{2}) -> ([a-z]{3})/)) {
        renamedProgram = renamedProgram.replaceAll(match[5], 's' + match[2]);
    }

    // OR for carry bits
    while(match = renamedProgram.match(/c([0-9]{2})_0 OR [a-z]{3} -> ([a-z]{3})/)){
        renamedProgram = renamedProgram.replaceAll(match[2], 'c' + match[1]);
    }
    while(match = renamedProgram.match(/[a-z]{3} OR c([0-9]{2})_0 -> ([a-z]{3})/)){
        renamedProgram = renamedProgram.replaceAll(match[2], 'c' + match[1]);
    }

    // AND in second level half adder
    while(match = renamedProgram.match(/s([0-9]{2}) AND c([0-9]{2}) -> ([a-z]{3})/)){
        renamedProgram = renamedProgram.replaceAll(match[3], 'c' + match[1] + "_1");
    }
    while(match = renamedProgram.match(/c([0-9]{2}) AND s([0-9]{2}) -> ([a-z]{3})/)){
        renamedProgram = renamedProgram.replaceAll(match[3], 'c' + match[2] + "_1");
    }

    console.log(swaps.flat().sort().join(','));

})()
