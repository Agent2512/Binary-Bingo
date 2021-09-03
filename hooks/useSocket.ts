import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

export type Tsocket = Socket<DefaultEventsMap, DefaultEventsMap>|undefined;

export default function useSocket() {
    // let socketIo: Socket<DefaultEventsMap, DefaultEventsMap> 
    const [socketIo, setSocketIo] = useState<Tsocket|undefined>(undefined)

    useEffect(() => {
        setSocketIo(io())


        function cleanup() {
            socketIo&&socketIo.disconnect()
        }
        return cleanup
    }, [])

    return socketIo
}