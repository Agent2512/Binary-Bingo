import { useSocket } from "hooks/useSocket";
import { useEffect, useState } from "react";
import { binaryGen } from "utils/binaryGen";

const gameMasterPage = () => {
    const socket = useSocket()
    const [gameCode, setGameCode] = useState("")

    useEffect(() => {
        socket.emit("makeGame")


        function cleanup() {
            socket.emit("leaveGame","gameMaster")
        }
        return cleanup
    }, [])
    
    return (
        <main id="gameMaster">
            <h1>game code: 0000</h1>
        </main>
    )
}

export default gameMasterPage