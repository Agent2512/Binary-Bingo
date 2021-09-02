export function makeNumCol(low: number, high: number) {
    const random = uniqueRandom(low, high)
    const numbers = [random(), random(), random()].sort()
    return numbers
}


function uniqueRandom(minimum: number, maximum: number) {
    let previousValue: number;

    return function random() {
        const number = Math.round(
            (Math.random() * (maximum - minimum + 1)) + minimum
        );

        previousValue = number === previousValue && minimum !== maximum ? random() : number;

        return previousValue;
    };
}
