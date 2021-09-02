export function binaryGen(num: number):string {
    // make binary number
    let BinaryNum = num.toString(2);

    let emprySpots = "";
    for(let i = 0; i < 8 - BinaryNum.length; i++) {
        emprySpots += "0";
    }

    return emprySpots+BinaryNum
}