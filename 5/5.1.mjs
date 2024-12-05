import { readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    const rules = [];
    

    let lineIndex = 0;
    while(lines[lineIndex].includes('|')){
        rules.push(lines[lineIndex].split('|').map(page => parseInt(page)));
        lineIndex++;
    }
    lineIndex++;

    function check(pages){
        const onlySecond = new Map();
        const first = new Map();
        for(let i = 0; i < pages.length; i++){
            const page = pages[i];
            for(let ruleId = 0; ruleId < rules.length; ruleId++){
                const rule = rules[ruleId];
                if(rule[0] === page){
                    if(onlySecond.has(ruleId)){
                        return false;
                    }
                    first.set(ruleId, true);                    
                } else if (rule[1] === page){
                    if(!first.has(ruleId)){
                        onlySecond.set(ruleId, true);
                    }
                }                
            };
        };
        return true;
    }

    function getMiddle(pages){
        return pages[(pages.length-1)/2];
    }

    let sum = 0;

    while(lineIndex < lines.length){
        const pages = lines[lineIndex].split(',').map(page => parseInt(page));
        if(check(pages)){
            sum += getMiddle(pages);
        }
        lineIndex++;
    }

    console.log(sum);
})()
