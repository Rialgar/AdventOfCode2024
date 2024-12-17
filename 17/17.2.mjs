const goal = [2n,4n,1n,5n,7n,5n,4n,5n,0n,3n,1n,6n,5n,5n,3n,0n];

function program(Ain){
    let A = Ain;
    let B = 0n;
    let C = 0n;

    const out = [];

    do {
        // 2,4,
        B = A & 0b111n;
        // 1,5,
        B = B ^ 0b101n;
        // 7,5,
        C = A >> B;
        // 4,5,
        B = B ^ C;
        // 0,3,
        A = A >> 3n;
        // 1,6,
        B = B ^ 0b110n;
        // 5,5,
        out.push(B & 7n);
        // 3,0
    } while(A > 0);
    return out;
}

function solve(A, position){
    if(position < 0){
        return A;
    }
    console.log(position)
    for(let piece = 0n; piece < 7n; piece++){        
        if(program((A<<3n) + piece)[0] === goal[position]){
            console.log(program((A<<3n) + piece));
            const attempt = solve((A<<3n) + piece, position-1);
            if(attempt){
                return attempt;
            }
        }
    }
}

console.log(solve(0n, goal.length-1));