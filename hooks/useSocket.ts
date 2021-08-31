import { useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"


export function useSocket() {
    let socketIo: Socket<DefaultEventsMap, DefaultEventsMap> = io()

    useEffect(() => {
        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup
    }, [])

    return socketIo
}