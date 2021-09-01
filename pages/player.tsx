import { useSocket } from "hooks/useSocket"
import { useEffect } from "react"

const playerPage = () => {
    const socket = useSocket()

    useEffect(() => {
        // socket.emit("joinGame", "test")

        
    }, [])


    return (
        <main id="player">

        </main>
    )
}

export default playerPage