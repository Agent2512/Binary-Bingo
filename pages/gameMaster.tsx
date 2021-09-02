import { useSocket } from "hooks/useSocket";
import { IGame } from "interfaces";
import { useEffect, useState } from "react";
import { binaryGen } from "utils/binaryGen";

const gameMasterPage = () => {
    const socket = useSocket()
    const [gameCode, setGameCode] = useState("")

    useEffect(() => {
        if (socket) {
            socket.emit("makeGame")

            socket.on("giveRoomid", i => setGameCode(i))

            socket.on("gameUpdate", (game: IGame) => {
                console.log(game);
                
            })
        }

    }, [socket])

    return (
        <main id="gameMaster">
            <h1 >game code: <span className="gameCode" >{gameCode}</span></h1>
        </main>
    )
}

export default gameMasterPage