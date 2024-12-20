import { manhattenDistance, readLines } from "../utils.mjs";

function repeat(char, times){
    let out = '';
    for(let i=0; i<times; i++){
        out += char;
    }
    return out;
}

// I manually checked which order gave the lowest result and used that, and it worked
// left first makes sense to me, since it makes sure the two lefts (the furthest from A) this requires in the next layer are directly adjacent
// I don't quite understand why right last is important, I think it is to avoid A<A in the next layer, which is expensive
// (A<A will expand into Av<<A>>^A, you really want to have another one on the way there or back, or at least do multiple lefts)
// (up and down can be interchanged without change, if that was not obvious)
function * expandStep(from, to, gapY){
    if(manhattenDistance(from, to) === 0){
        yield 'A';
        return;
    }
    if(from.x > to.x && (gapY !== from.y || to.x > 0)){
        for(let sub of expandStep({x: to.x, y:from.y}, to, gapY)){
            yield repeat('<', from.x-to.x) + sub;
        }
    }
    if(from.y > to.y && (from.x !== 0 || (from.y !== gapY && to.y !== gapY))){
        for(let sub of expandStep({x: from.x, y:to.y}, to, gapY)){
            yield repeat('^', from.y-to.y) + sub;
        }
    }
    if(from.y < to.y && (from.x !== 0 || (from.y !== gapY && to.y !== gapY))){
        for(let sub of expandStep({x: from.x, y:to.y}, to, gapY)){
            yield repeat('v', to.y-from.y) + sub;
        }
    }
    if(from.x < to.x){
        for(let sub of expandStep({x: to.x, y:from.y}, to, gapY)){
            yield repeat('>', to.x-from.x) + sub;
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

function * expandNumPad(sequence, i=0){
    if(i + 1 >= sequence.length ){
        yield '';
        return;
    }
    for(let sub of expandNumPad(sequence, i+1)){
        for(let step of expandNumStep(sequence.charAt(i), sequence.charAt(i+1))){
            yield  step + sub;
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
        default:
            throw new Error(`${num} is not a direction`);
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
            yield  step + sub;
        }
    }
}

const cache = new Map();

function expandedLength(from, to, depth){
    if(depth === 0){
        return 1;
    } else {
        const key = `${from}${to}${depth}`;
        if(cache.has(key)){
            return cache.get(key);
        }
        const exp = 'A' + expandDirectionStep(from, to).next().value;
        let sum = 0;
        for(let i = 0; i+1 < exp.length; i++){
            sum += expandedLength(exp[i], exp[i+1], depth - 1);
        }
        cache.set(key, sum);
        return sum;
    }
};

function getCheapestLength(sequence, depth){
    const ch = 'A' + expandNumPad(sequence).next().value;
    let sum = 0;
    for(let i = 0; i+1 < ch.length; i++){
        sum += expandedLength(ch[i], ch[i+1], depth);
    }
    return sum;
}


(async () => {
    const lines = await readLines('./input');
    
    let sum = 0;
    for(let line of lines){
        console.log(line);
        const shortest = getCheapestLength('A' + line, 25);
        console.log(shortest);
        sum += shortest * parseInt(line);
    }    
    console.log(sum);
})()


/* experiments to understand WHY this works

<^A
v<<A>^A>A // two adjacent <
<vA<AA>>^AvA<^A>AvA^A

^<A
<Av<A>>^A // two < with an A in between, expensive!
v<<A>>^Av<A<A>>^AvAA^<A>A

<vA
v<<A>A^>A // two adjacent <
<vA<AA>>^AvA^A<Av>A^A

v<A
v<A<A>>^A // two < with an A in between, expensive!
v<A<A>>^Av<<A>>^AvAA^<A>A

^>A
<Av>A^A
v<<A>>^A<vA>A^A<A>A
<vA<AA>>^AvAA<^A>Av<<A>A^>AvA^A<A>Av<<A>>^AvA^A
v<<A>A^>Av<<A>>^AAvAA<^A>A<vA^>AAv<<A>^A>AvA^A<vA<AA>>^AvA^A<Av>A^A<vA^>A<A>Av<<A>>^AvA^A<vA<AA>>^AvAA<^A>A<vA^>A<A>A

>^A
vA<^A>A
<vA>^Av<<A>^A>AvA^A
v<<A>A>^AvA<^A>A<vA<AA>>^AvA<^A>AvA^A<vA>^A<A>A
<vA<AA>>^AvA^AvA<^A>A<vA>^Av<<A>^A>AvA^Av<<A>A>^Av<<A>>^AAvAA<^A>A<vA>^Av<<A>^A>AvA^A<vA>^A<A>Av<<A>A>^AvA<^A>Av<<A>>^AvA^A

v>A
<vA>A^A
v<<A>A^>AvA^A<A>A
<vA<AA>>^AvA^A<Av>A^A<vA^>A<A>Av<<A>>^AvA^A
v<<A>A^>Av<<A>>^AAvAA<^A>A<vA^>A<A>Av<<A>>^A<vA>A^A<A>Av<<A>A^>A<Av>A^Av<<A>>^AvA^A<vA<AA>>^AvAA<^A>A<vA^>A<A>A

>vA
vA<A>^A
<vA>^Av<<A>>^AvA<^A>A
v<<A>A>^AvA<^A>A<vA<AA>>^AvAA<^A>A<vA>^Av<<A>^A>AvA^A
<vA<AA>>^AvA^AvA<^A>A<vA>^Av<<A>^A>AvA^Av<<A>A>^Av<<A>>^AAvAA<^A>A<vA>^AAv<<A>^A>AvA^Av<<A>A>^AvA<^A>A<vA<AA>>^AvA<^A>AvA^A<vA>^A<A>A

*/