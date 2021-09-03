import useSocket from "hooks/useSocket";
import { IGame } from "interfaces";
import { useEffect, useState } from "react";
import { binaryGen } from "utils/binaryGen";
import { uniqueRandom } from "utils/makeNumCol";

const gameMasterPage = () => {
    const socket = useSocket()
    const [gameCode, setGameCode] = useState("")
    const [numbers, setNumbers] = useState<number[]>([])


    useEffect(() => {
        if (socket) {
            socket.emit("makeGame")

            socket.on("giveRoomid", i => setGameCode(i))

            socket.on("gameUpdate", (game: IGame) => {
                console.log(game.numbers);

            })
        }


    }, [socket])

    useEffect(() => {
        if (socket) {
            socket.emit("numbersUpdate", numbers)
        }
    }, [numbers])


    const next = () => {

        const random = uniqueRandom(1, 90)
        let num = random()
        while (numbers.includes(num)) {
            num = random()
        }

        setNumbers(pre => {
            let newArr = [...pre]
            newArr.push(num)
            return newArr
        })


    }

    return (
        <>
            <main id="gameMaster">
                <h1 >game code: <span className="gameCode" >{gameCode}</span></h1>

                <p className="binaryNumber" >{numbers[numbers.length - 1]}</p>

                <button onClick={next} >next number</button>
            </main>
            {/* {numbers.map(i => <p style={{color:"#fff"}}  >{i}</p>)} */}
        </>
    )
}

export default gameMasterPage