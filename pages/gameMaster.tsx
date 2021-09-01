import { useSocket } from "hooks/useSocket";
import { useEffect, useState } from "react";
import { binaryGen } from "server/utils/binaryGen";

const gameMasterPage = () => {
    const socket = useSocket()
    const [gameCode, setGameCode] = useState("")

    useEffect(() => {
        socket.emit("makeGame")

        socket.on("giveRoomid", i => setGameCode(i))
        
    }, [])
    
    return (
        <main id="gameMaster">
            <h1 >game code: <span className="gameCode" >{gameCode}</span></h1>
        </main>
    )
}

export default gameMasterPage