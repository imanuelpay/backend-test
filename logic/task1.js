function solution(a, m, k) {
    let result = 0;

    for (let i = 0; i <= a.length - m; i++) {
        let flagFound = false;

        for (let j = i; j < i + m; j++) {
            for (let l = j + 1; l < i + m; l++) {
                if (a[j] + a[l] === k && j !== l) {
                    flagFound = true;
                    break;
                }
            }

            if (flagFound) {
                result++;
                break;
            }
        }
    }

    return result;
}

const a = [15, 8, 8, 2, 6, 4, 1, 7];
const m = 2;
const k = 8;
console.log('solution :', solution(a, m, k));