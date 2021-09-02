import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"


export function useSocket() {
    // let socketIo: Socket<DefaultEventsMap, DefaultEventsMap> 
    const [socketIo, setSocketIo] = useState<Socket<DefaultEventsMap, DefaultEventsMap>|undefined>(undefined)

    useEffect(() => {
        setSocketIo(io())


        function cleanup() {
            socketIo&&socketIo.disconnect()
        }
        return cleanup
    }, [])

    return socketIo
}