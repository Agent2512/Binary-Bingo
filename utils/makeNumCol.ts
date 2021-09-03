export default function makeNumCol(low: number, high: number) {
    const random = uniqueRandom(low, high)
    const numbers: number[] = []

    while (numbers.length != 3) {
        const num = random()
        if  (numbers.includes(num) == false) numbers.push(num)
    }

    
    return numbers.sort()
}


export function uniqueRandom(minimum: number, maximum: number) {
    let previousValue: number;

    return function random() {
        const number = Math.floor(
            (Math.random() * (maximum - minimum + 1)) + minimum
        );

        previousValue = number === previousValue && minimum !== maximum ? random() : number;

        return previousValue;
    };
}
