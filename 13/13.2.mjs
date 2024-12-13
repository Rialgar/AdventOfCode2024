import { largest_common_divider, readLines, smallest_common_multiple } from "../utils.mjs";

(async () => {
    const lines = await readLines('./input');

    let sum = 0n;

    for(let i=0; i<lines.length; i+=4){
        const machineNumber = i/4 + 1;

        const matchA = lines[i].match(/: X\+([0-9]+), Y\+([0-9]+)/);
        let buttonA = {x: BigInt(matchA[1]), y: BigInt(matchA[2])};

        const matchB = lines[i+1].match(/: X\+([0-9]+), Y\+([0-9]+)/);
        let buttonB = {x: BigInt(matchB[1]), y: BigInt(matchB[2])};

        const matchPrize = lines[i+2].match(/: X=([0-9]+), Y=([0-9]+)/);
        const prize = {x: BigInt(matchPrize[1])+10000000000000n, y: BigInt(matchPrize[2])+10000000000000n};

        if(buttonB.y * buttonA.x === buttonB.x * buttonA.y){
            console.error("böp!", machineNumber);
            process.exit();
        }

        const top = prize.y * buttonA.x - prize.x * buttonA.y;
        const bottom = buttonB.y * buttonA.x - buttonB.x * buttonA.y;

        if(top % bottom === 0n){
            const timesB = (prize.y * buttonA.x - prize.x * buttonA.y) / (buttonB.y * buttonA.x - buttonB.x * buttonA.y);
            const timesA = (prize.x - timesB * buttonB.x) / buttonA.x;

            const cost = timesA * 3n + timesB;
            sum += cost;

            console.log(machineNumber, timesA, timesB, cost);
        }

        console.log('=======================================');
    }
    console.log(sum);
})()
