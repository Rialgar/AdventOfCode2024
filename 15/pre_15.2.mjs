import { readChars } from "../utils.mjs";
import { readdir, stat, writeFile } from "fs/promises";

(async () =>{
    const files = await readdir('.');
    for(let filename of files){
        if((await stat(filename)).isDirectory()){
            const input = await readChars(filename + '/map');
            const output = input.map( line => line.map(c => {
                if(c === '@'){
                    return '@.';
                } else if(c === 'O'){
                    return '[]';
                } else {
                    return c + c;
                }
            }).join('')).join('\n');

            writeFile(filename + '/map_doubled', output, {encoding: "utf8"});
        }
    }
})()