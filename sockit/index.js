const express = require("express")
const app = express()
const http = require("http")   // HTTP LIBERARY OF NODE TO CREATE SERVER
const cors = require("cors")      // TO MANAGE CROSS ORIGIN RESOURCE SHARING
const { Server } = require("socket.io")   // SERVER CLASS FROM SOCKET.IO LIBERARY
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",     // ALLOWING THE CLIENT TO PERFORM GET AND POST REQUEST
        methods: ["GET", "POST"]
    }
})
io.on("connection", socket => {    // CREATING CONNECTION WITH CLIENTS
    console.log("console is connected")
    socket.on("join-room", room => {    // CREATING AN EVENT USING SOCKET.ON
        socket.join(room)
        console.log("user join at ", room)
    })

    socket.on("sendmessages", data => {
        socket.to(data.room).emit("recive_message", data)   // PERFOMING AN EVENT 
    })

    socket.on("disconnect", () => {          // PRE DEFIENED EVENT WHEN USER DISCONNECT
        console.log("user disconnectd", socket.id)
    })
})
server.listen(2000, () => {
    console.log("server is running")
})














