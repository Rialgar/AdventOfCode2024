import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    const locks = [];
    const keys = [];

    let lineNo = 0;
    function parseKey(){
        let key = [5,5,5,5,5]
        for(let i = 4; i >= 0; i--){
            lineNo++;
            for(let charNo = 0; charNo < 5; charNo++){
                if(lines[lineNo][charNo] === '.'){
                    key[charNo] = i;
                }
            }
        }
        keys.push(key);
        lineNo += 3; //+1 bottom row, +1 empty row, +1 start of next schematic
    }
    function parseLock(){
        let lock = [0,0,0,0,0]
        for(let i = 1; i <= 5; i++){
            lineNo++;
            for(let charNo = 0; charNo < 5; charNo++){
                if(lines[lineNo][charNo] === '#'){
                    lock[charNo] = i;
                }
            }
        }
        locks.push(lock);
        lineNo += 3; //+1 bottom row, +1 empty row, +1 start of next schematic
    }
    while(lineNo < lines.length){
        if(lines[lineNo][0] === '#'){
            parseLock();
        } else {
            parseKey();
        }
    }
    let count = 0;
    for(let key of keys){
        lockLoop: for(let lock of locks){
            for(let tumbler = 0; tumbler < 5; tumbler++){
                if(key[tumbler] + lock[tumbler] > 5){
                    continue lockLoop;
                }
            }
            count++;
        }
    }
    console.log(count);
})()
