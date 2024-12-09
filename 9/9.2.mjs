import { initArray, readLines } from "../utils.mjs";

(async () => {
    const digits = ((await readLines('./input'))[0].split('')).map(c => parseInt(c));
    const freeSpaces = [];
    const files = [];

    let fileId = 0;
    let isFile = true;
    let pointer = 0
    for(let digit of digits){
        if(isFile){
            files.push({id: fileId, location: pointer, size: digit});
            fileId++
        } else {
            freeSpaces.push({location: pointer, size: digit});
        }
        pointer += digit;
        isFile = !isFile;
    }

    for(let fi = files.length-1; fi >=0; fi--){
        const size = files[fi].size;
        for(let si = 0; si < freeSpaces.length; si++){
            if(freeSpaces[si].location > files[fi].location){
                break;
            }
            if(size <= freeSpaces[si].size){
                files[fi].location = freeSpaces[si].location;
                if(size < freeSpaces[si].size){
                    freeSpaces[si].location += size;
                    freeSpaces[si].size -= size;
                } else {
                    freeSpaces.splice(si, 1);
                }
                break;
            }
        }
    }

    let checkSum = BigInt(0);    
    for(let file of files){
        for(let n = 0; n < file.size; n++){
            checkSum = checkSum + BigInt(file.location + n) * BigInt(file.id);
        }
    }
    console.log(checkSum);
})()
