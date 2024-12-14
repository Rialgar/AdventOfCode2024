import { initArray, initMap, leftPad, multiplyArray, readLines } from "../utils.mjs";

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

    let time = 0;
    let maxInBounds = 0;
    simul: while(true){
        time++;

        bots.forEach(bot => {
            bot.p.x = (bot.p.x + bot.v.x) % width;
            if(bot.p.x < 0){
                bot.p.x += width;
            }
            bot.p.y = (bot.p.y + bot.v.y) % height;
            if(bot.p.y < 0){
                bot.p.y += height;
            }
        });

        // used this to find close matches. Seemed like two pictures at first.
        // one picture seemed to have lines at y 23 55
        // one picture seemed to have lines at x 36 66

        /*const corner = 7;
        for(let bot of bots){
            if(bot.p.x < corner && bot.p.y < corner){
                continue simul;
            }
            if(bot.p.x < corner && bot.p.y > height - corner){
                continue simul;
            }
            if(bot.p.x > width - corner && bot.p.y < corner){
                continue simul;
            }
            if(bot.p.x > width - corner && bot.p.y > height - corner){
                continue simul;
            }
        }*/

        // I actually used this to eyeball it, the one after is refinement after submission:
        /*const inX = bots.filter(bot => bot.p.x > 35 && bot.p.x < 67).length;
        if(inX >= maxInX){
            maxInX = inX;
            await printBots();
        }*/

        const inBounds = bots.filter(bot => bot.p.x > 35 && bot.p.x < 67 && bot.p.y > 22 && bot.p.y < 56).length;
        if(inBounds >= maxInBounds){
            maxInBounds = inBounds;
            await printBots();
            if(maxInBounds === 353){
                break simul;
            }
        }

        // This will only become legible ina tiny terminal font, I could not be bothored to mess with images
        async function printBots(){
            let counts = initMap(width, height, 0);
            bots.forEach(bot => {
                counts.set(bot.p.x, bot.p.y, counts.get(bot.p.x, bot.p.y).data + 1);
            })
            console.log(`=== ${time} ${maxInBounds} ===`);
            console.log('   |' + initArray(width).map((v, i) => leftPad(i, 3)).join(''));
            counts.print( v => v === 0 ? '   ' : '███', (row, index) => leftPad(index, 3) + "|");
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }
})()
