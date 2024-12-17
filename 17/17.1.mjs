let A = 63281501;
let B = 0;
let C = 0;

const out = [];

do {
    // 2,4,
    B = A % 8;
    // 1,5,
    B = B ^ 5;
    // 7,5,
    C = Math.floor(A / (2 ** B)); // right shift B
    // 4,5,
    B = B ^ C;
    // 0,3,
    A = Math.floor(A / (2 ** 3)); // right shift 3
    // 1,6,
    B = B ^ 6;
    // 5,5,
    out.push(B % 8);
    //3,0
    console.log(A.toString(2));
} while(A != 0)

console.log(out.join(','));