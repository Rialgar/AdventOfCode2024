import { manhattenDistance, readLines } from "../utils.mjs";

function * expandStep(from, to, gapY){
    if(manhattenDistance(from, to) === 0){
        yield '';
        return;
    }
    if(from.x < to.x){
        for(let sub of expandStep({x: from.x+1, y:from.y}, to, gapY)){
            yield '>' + sub;
        }
    }
    if((gapY !== from.y || from.x > 1) && from.x > to.x){
        for(let sub of expandStep({x: from.x-1, y:from.y}, to, gapY)){
            yield '<' + sub;
        }
    }
    if(from.y < to.y && (from.x !== 0 || from.y + 1 !== gapY)){
        for(let sub of expandStep({x: from.x, y:from.y+1}, to, gapY)){
            yield 'v' + sub;
        }
    }
    if(from.y > to.y && (from.x !== 0 || from.y - 1 !== gapY)){
        for(let sub of expandStep({x: from.x, y:from.y-1}, to, gapY)){
            yield '^' + sub;
        }
    }
}

function numToLocation(num){
    switch(num){
        case 'A':
            return {x:2, y:3};
        case '0':
            return {x:1, y:3};
        case '1':
            return {x:0, y:2};
        case '2':
            return {x:1, y:2};
        case '3':
            return {x:2, y:2};
        case '4':
            return {x:0, y:1};
        case '5':
            return {x:1, y:1};
        case '6':
            return {x:2, y:1};
        case '7':
            return {x:0, y:0};
        case '8':
            return {x:1, y:0};
        case '9':
            return {x:2, y:0};
    }
}

function expandNumStep(fromN, toN){
    const from = numToLocation(fromN);
    const to = numToLocation(toN);
    return expandStep(from, to, 3);
}

function * expandNumpad(sequence, i=0){
    if(i + 1 >= sequence.length ){
        yield '';
        return;
    }
    for(let sub of expandNumpad(sequence, i+1)){
        for(let step of expandNumStep(sequence.charAt(i), sequence.charAt(i+1))){
            yield  step + 'A' + sub;
        }
    }
}

function directionToLocation(num){
    switch(num){
        case 'A':
            return {x:2, y:0};
        case '<':
            return {x:0, y:1};
        case '>':
            return {x:2, y:1};
        case '^':
            return {x:1, y:0};
        case 'v':
            return {x:1, y:1};
    }
}

function expandDirectionStep(fromD, toD){
    const from = directionToLocation(fromD);
    const to = directionToLocation(toD);
    return expandStep(from, to, 0);
}

function * expandDirectionPad(sequence, i=0){
    if(i + 1 >= sequence.length ){
        yield '';
        return;
    }
    for(let sub of expandDirectionPad(sequence, i+1)){
        for(let step of expandDirectionStep(sequence.charAt(i), sequence.charAt(i+1))){
            yield  step + 'A' + sub;
        }
    }
}

(async () => {
    const lines = await readLines('./input');
    
    let sum = 0;
    for(let line of lines){
        let shortest = Number.MAX_SAFE_INTEGER;
        let shortestChain = [];
        console.log(line);
        for(let expansion1 of expandNumpad('A' + line)){
            for(let expansion2 of expandDirectionPad('A' + expansion1)){
                //one step only produces the same length, so we only need the first result on the last expansion
                const expansion3 = expandDirectionPad('A' + expansion2).next().value;
                if(expansion3.length < shortest){
                    shortest = expansion3.length;
                    shortestChain = [line, expansion1, expansion2, expansion3];
                }
            }
        }
        console.log(shortestChain);
        console.log(shortest);
        sum += shortest * parseInt(line);
    }    
    console.log(sum);
})()
