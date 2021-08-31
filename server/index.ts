import next from 'next'
import express, { Request, Response } from 'express'
import { createServer } from "http";
import {Server as socketio } from "socket.io"

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()
    const http_server = createServer(server)
    const io = new socketio(http_server)

    io.on('connection', socket => {
        console.log("new WS connection", socket.id);

        socket.on("test", obj => console.log(obj));
    })




    server.all('*', (req: Request, res: Response) => {
        return handle(req, res)
    })

    http_server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})