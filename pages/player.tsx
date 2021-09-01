import { useSocket } from "hooks/useSocket"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import queryString from 'query-string';

const playerPage = () => {
    const socket = useSocket()
    const router = useRouter()

    useEffect(() => {
        const { roomid} = queryString.parse(location.search) as {roomid: string| undefined}

        if (!roomid) router.replace("/")
    }, [])


    useEffect(() => {
        
    }, [])

    


    return (
        <main id="player">

        </main>
    )
}

export default playerPage