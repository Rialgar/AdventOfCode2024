import { multiplyArray, readLines } from "../utils.mjs";

const example = false;

(async () => {
    const lines = await readLines(example ? './example' : './input');
    const width = example ? 11 : 101;
    const height = example ? 7 : 103;

    const bots = lines.map(line => {
        const match = line.match(/p=([0-9]+),([0-9]+) v=(-?[0-9]+).(-?[0-9]+)/);
        return {
            p: {x: parseInt(match[1]), y: parseInt(match[2])},
            v: {x: parseInt(match[3]), y: parseInt(match[4])}
        }
    });

    const time = 100;

    bots.forEach(bot => {
        bot.p.x = (bot.p.x + bot.v.x * time) % width;
        if(bot.p.x < 0){
            bot.p.x += width;
        }
        bot.p.y = (bot.p.y + bot.v.y * time) % height;
        if(bot.p.y < 0){
            bot.p.y += height;
        }
    });

    let counts = [[0,0],[0,0]];
    let center = {x: Math.floor(width/2), y: Math.floor(height/2)};

    bots.forEach(bot => {
        if(bot.p.x < center.x){
            if(bot.p.y < center.y){
                counts[0][0] += 1;
            } else if (bot.p.y > center.y) {
                counts[0][1] += 1;
            }
        } else if(bot.p.x > center.x){
            if(bot.p.y < center.y){
                counts[1][0] += 1;
            } else if (bot.p.y > center.y) {
                counts[1][1] += 1;
            }
        }
    })

    console.log(multiplyArray(counts.map(multiplyArray)));
})()
