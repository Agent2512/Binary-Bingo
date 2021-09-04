import Results from "components/gameMaster/results";
import ShowScreen from "components/gameMaster/showScreen";
import useSocket from "hooks/useSocket";
import { IGame } from "server/src/interfaces";
import { useEffect, useState } from "react";
import { binaryGen } from "utils/binaryGen";
import { uniqueRandom } from "utils/makeNumCol";

const gameMasterPage = () => {
    const socket = useSocket()
    const [gameCode, setGameCode] = useState("")
    const [numbers, setNumbers] = useState<number[]>([])
    const [showValue, setShowValue] = useState("")
    const [playerCount, setPlayerCount] = useState(0)
    const [timer, setTimer] = useState(15)
    const [masterNumbers, setMasterNumbers] = useState<number[]>([])
    const [showNumber, setShowNumber] = useState(false)

    useEffect(() => {
        if (socket) {
            socket.emit("makeGame")

            socket.on("giveRoomid", i => setGameCode(i))

            socket.on("gameUpdate", (game: IGame) => {
                setPlayerCount(game.playerCount)
                setMasterNumbers(game.numbers)
                // console.log(game.numbers);

            })

            socket.on("playerGotLine", (numOfLines: number) => {
                // console.log(numOfLines);
                setShowValue(numOfLines.toString())
            })
        }


    }, [socket])

    useEffect(() => {
        if (showValue) {
            setTimeout(() => {
                setShowValue("")
            }, 3000);
        }

    }, [showValue])

    useEffect(() => {
        if (socket) {
            socket.emit("numbersUpdate", numbers)
        }
    }, [numbers, socket])


    const next = () => {

        const random = uniqueRandom(1, 90)
        let num = random()
        while (numbers.includes(num)) {
            if (numbers.length == 90) {
                break
            }
            num = random()
        }

        if (numbers.length != 90) {
            setNumbers(pre => {
                let newArr = [...pre]
                newArr.push(num)
                return newArr
            })
        }



    }

    useEffect(() => {
        let intval = 15

        next()

        setInterval(() => {
            setTimer(pre => {
                if (pre == 0) {
                    next()

                    return intval
                }

                return pre - 1
            })
        }, 1000)

        // return clearInterval(intval)
    }, [])


    const showNum = () => {
        setShowNumber(pre => !pre)
    }

    return (
        <>
            <main id="gameMaster">
                <div className="top">
                    <h1 >game code: <span className="gameCode" >{gameCode}</span></h1>
                    <p>playerCount: {playerCount}</p>
                </div>

                <div className="numbers" >
                    <p>128</p>
                    <p>64</p>
                    <p>32</p>
                    <p>16</p>
                    <p>8</p>
                    <p>4</p>
                    <p>2</p>
                    <p>1</p>

                    {numbers[0] && binaryGen(numbers[numbers.length - 1]).split("").map((v, i) => <p key={i} >{v}</p>)}
                </div>

                <div className="bottom">
                    <div>
                        <button onClick={next} >next number</button>
                        <button onClick={showNum} >show number</button>
                    </div>
                    <p>{timer} S</p>
                </div>
            </main>
            {showValue && <ShowScreen value={showValue} />}
            {showNumber&&<Results func={showNum} numbers={masterNumbers} />}
        </>
    )
}

export default gameMasterPage