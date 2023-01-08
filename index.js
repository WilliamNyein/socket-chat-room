const express = require('express')
const app = express();
const socket = require('socket.io')

//middleware
app.use(express.static('public'))

//server
const server = app.listen(4000,()=>console.log('listening on port 4000'))


//socket setup
const io = socket(server)
io.on("connection",socket=>{
    console.log("socket init",socket.id);
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
        console.log(data);
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',data)
    })
})