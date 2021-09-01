import next from 'next'
import express, { Request, Response } from 'express'
import { createServer } from "http";
import { Server as socketio } from "socket.io"
import { genID } from './utils/genID';
import { IGame } from 'interfaces';
import { json } from 'body-parser';

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

let games: IGame[] = []
let gameMasters: string[] = []
let players: { playerid: string, roomid: string }[] = []

app.prepare().then(() => {
    const server = express()
    server.use(json())
    const http_server = createServer(server)
    const io = new socketio(http_server)






    io.on('connection', socket => {
        socket.on("makeGame", () => {
            gameMasters.push(socket.id);

            const roomid = genID(socket.id)
            socket.join(roomid)


            games.push({
                roomid: roomid,
                gameMaster: socket.id,
                playerCount: 0,
                players: []
            })

            socket.emit("giveRoomid", roomid)
        })

        socket.on("joinGame", (roomid: string) => {
            players.push({
                playerid: socket.id,
                roomid: roomid
            })

            const gameIndex = games.map(i => i.roomid).includes(roomid)

            console.log("game", gameIndex, roomid);

        })







        socket.on("disconnect", () => {
            if (gameMasters.includes(socket.id)) {
                console.log("gameMaster disconnect", socket.id);
                const gameMasterIndex = gameMasters.indexOf(socket.id)
                gameMasters.splice(gameMasterIndex, 1)

                for (let i = 0; i < games.length; i++) {
                    const game = games[i];

                    if (game.gameMaster != socket.id) continue

                    games.splice(i, 1)
                    break
                }
            }

            if (players.map(i => i.playerid).includes(socket.id)) {
                console.log("player disconnect", socket.id);

            }

        });
    })


    server.post('/getGame', (req: any, res: Response) => {
        const query = req.body as { roomid: string | undefined }

        res.json({test: true, roomid: query.roomid})
    })

    server.all('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    http_server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})