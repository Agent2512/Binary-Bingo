import md5 from "md5";
// import rn from "random-number"

export function genID(value: string) {
    const md5String = md5(value).substr(0,30)
    let newString = "";

    // re make all number to letters
    newString = numToLett(md5String)

    // char Code Reduce
    newString = charCodeReduce(newString)

    // Modulus Reduce
    newString = ModulusReduce(newString)

    // char Code Reduce
    newString = charCodeReduce(newString)

    // Modulus Reduce
    newString = ModulusReduce(newString)

    // char Code Reduce
    newString = charCodeReduce(newString)

    // re make all number to letters
    newString = numToLett(newString)

    return newString
}

function charCodeReduce(value:string) {
    let newString = ""

    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const nextChar = value[i+1];
        if (!nextChar) continue;

        if (char.charCodeAt(0) - nextChar.charCodeAt(0) <= 0) {
            newString += char;
            i++
        }
        else {
            newString += char
        }
    }

    return newString
}

function numToLett(value:string) {
    let newString = ""

    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        
        if (char.match("[0-9]")) {
            char == "0" && (newString += "a")
            char == "1" && (newString += "b")
            char == "2" && (newString += "c")
            char == "3" && (newString += "d")
            char == "4" && (newString += "f")
            char == "5" && (newString += "g")
            char == "6" && (newString += "h")
            char == "7" && (newString += "i")
            char == "8" && (newString += "j")
            char == "9" && (newString += "k")
        }
        else newString += char
        
    }

    return newString
}

function ModulusReduce(value:string) {
    let newString = ""
    
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        const nextChar = value[i+1];
        if (!nextChar) continue;

        if (char === nextChar) {
            newString += char.charCodeAt(0) % 4;
            i++
        }
        else {
            newString += char
        }
    }

    return newString
}