const a = 3;
const b = 4;
const c = 5;
if ((a, b, c) <= 1 || (a, b, c) >= 50000) {
    console.log('a b c không thỏa')
}
if ((a + b) < c) {
    console.log('không thỏa điều kiện')
} else {
    const p = (a + b + c) / 2;
    const tinh = (p * (p - a) * (p - b) * (p - c));
    Math.sqrt(tinh)
}