import useSocket from "hooks/useSocket"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import queryString from 'query-string';
import GameBord from "components/player/gameBord";
import { IGame } from "interfaces";

const playerPage = () => {
    const socket = useSocket()
    const router = useRouter()
    const [gameCode, setGameCode] = useState("")


    useEffect(() => {
        const { roomid} = queryString.parse(location.search) as {roomid: string| undefined}
        if (!roomid) router.replace("/")
        else {
            fetch("/getGame", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({roomid})
            })
            .then(res => res.json())
            .then(value => {
                if (value) {
                    setGameCode(roomid);
                }
                else router.replace("/")
            })
        }
        
        if (socket) {
            socket.emit("joinGame", roomid)

            socket.on("gameUpdate", (game: IGame) => {
                console.log(game);
                
            })
        }


    }, [socket])

    return (
        <main id="player">
            <GameBord />
        </main>
    )
}

export default playerPage