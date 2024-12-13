import { largest_common_divider, readLines } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');
    
    let sum = 0;

    for(let i=0; i<lines.length; i+=4){
        const machineNumber = i/4 + 1;

        const matchA = lines[i].match(/: X\+([0-9]+), Y\+([0-9]+)/);
        let buttonA = {x: parseInt(matchA[1]), y: parseInt(matchA[2])};

        const matchB = lines[i+1].match(/: X\+([0-9]+), Y\+([0-9]+)/);
        let buttonB = {x: parseInt(matchB[1]), y: parseInt(matchB[2])};

        const matchPrize = lines[i+2].match(/: X=([0-9]+), Y=([0-9]+)/);
        const prize = {x: parseInt(matchPrize[1]), y: parseInt(matchPrize[2])};

        const lcdX = largest_common_divider(buttonA.x, buttonB.x);
        if(prize.x % lcdX !== 0){
            console.log(machineNumber, 'impossible on x');
            continue;
        }

        const lcdY = largest_common_divider(buttonA.y, buttonB.y);
        if(prize.y % lcdY !== 0){
            console.log(machineNumber, 'impossible on y');
            continue;
        }

        const swapped = buttonA.x < buttonB.x;
        if(swapped){
            const temp = buttonA;
            buttonA = buttonB;
            buttonB = temp;
        }

        const factorAX = buttonA.x / lcdX;
        const modBX = buttonB.x % factorAX;
        const modPrizeX = prize.x % factorAX;        

        let stepsB = 0;
        while((stepsB * modBX) % factorAX !== modPrizeX){
            stepsB++;
        }
        const first = stepsB;
        stepsB++;
        while((stepsB * modBX) % factorAX !== modPrizeX){
            stepsB++;
        }
        const second = stepsB;

        const cycle = second - first;
        const addition = first % cycle;

        if(swapped){
            console.log(machineNumber, `A needs to be pressed n * ${cycle} + ${addition} times for x`);
        } else {
            console.log(machineNumber, `B needs to be pressed n * ${cycle} + ${addition} times for x`);
        }
        

        let costMin = Number.MAX_SAFE_INTEGER;
        let foundAny = false;
        for(let n = 0; (n * cycle + addition) * buttonB.x <= prize.x; n++){
            const timesB = n * cycle + addition;
            const timesA = (prize.x - timesB*buttonB.x) / buttonA.x;
            const ySum = timesA * buttonA.y + timesB * buttonB.y;
            const works = ySum === prize.y;

            if(works){
                let cost;
                if(swapped){
                    cost = timesB * 3 + timesA;
                    console.log(`Option: ${timesB} A, ${timesA} B. Cost ${cost}`);
                } else {
                    cost = timesA * 3 + timesB;
                    console.log(`Option: ${timesA} A, ${timesB} B. Cost ${cost}`);
                }
                costMin = Math.min(cost, costMin);
                foundAny = true;
            }
        }
        if(foundAny){
            sum += costMin;
        }
        
        console.log('=======================================');
    }
    console.log(sum);
})()
