import next from 'next'
import express, { Request, Response } from 'express'
import { createServer } from "http";
import { Server as socketio } from "socket.io"
import { genID } from './utils/genID';
import { IGame } from 'server/src/interfaces';
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
                players: [],
                numbers: []
            })

            socket.emit("giveRoomid", roomid)
        })

        socket.on("joinGame", (roomid: string) => {
            const game = games.find(i => i.roomid == roomid)
            // console.log(socket.id, "game", game?.roomid);

            if (game) {
                // add player to players array
                players.push({
                    playerid: socket.id,
                    roomid: roomid
                })
                // player join gmae room
                socket.join(roomid)
                // add player to game object
                game.playerCount++
                game.players.push(socket.id)

                io.to(game.roomid).to(game.gameMaster).emit("gameUpdate", game)
                // console.log("gameUpdate", game);
                
            }
        })

        socket.on("numbersUpdate", (numbers:number[]) => {
            const {id} = socket
            
            const game = games.find(i => i.gameMaster == id)

            if (game) {
                game.numbers = numbers

                io.to(game.roomid).to(game.gameMaster).emit("gameUpdate", game)
            }
        })

        socket.on("playerLines", (numOfLines:number) => {
            const {id} = socket
            
            const game = games.find(i => i.players.includes(id))

            if (game) {
                io.to(game.gameMaster).emit("playerGotLine", numOfLines)
            }
        })





        socket.on("disconnect", () => {
            if (gameMasters.includes(socket.id)) {
                const gameMasterIndex = gameMasters.indexOf(socket.id)
                gameMasters.splice(gameMasterIndex, 1)

                for (let i = 0; i < games.length; i++) {
                    const game = games[i];
                    io.to(game.roomid).emit("forceLeave")
                    if (game.gameMaster != socket.id) continue
                    games.splice(i, 1)
                    break
                }
            }

            if (players.map(i => i.playerid).includes(socket.id)) {
                for (let i = 0; i < players.length; i++) {
                    // get player
                    const player = players[i];
                    // not player continue
                    if (player.playerid != socket.id) continue
                    // find game
                    const game = games.find(i => i.roomid == player.roomid)
                    // validat game
                    if (game) {
                        // reduse player const
                        game.playerCount--;
                        const gamePlayerIndex = game.players.indexOf(player.playerid)
                        game.players.splice(gamePlayerIndex, 1)


                        io.to(game.roomid).to(game.gameMaster).emit("gameUpdate", game)
                    }

                    players.splice(i, 1)


                    break
                }

                // console.log("players", players);
            }

        });
    })

    // server
    server.post('/getGame', (req: any, res: Response) => {
        const { roomid } = req.body as { roomid: string | undefined }

        if (roomid && games.map(i => i.roomid).includes(roomid)) {
            return res.json(true)
        }
        else return res.json(false)
    })

    server.all('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    http_server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})