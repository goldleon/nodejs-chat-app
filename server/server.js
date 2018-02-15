// Build in Modules
const path = require("path");
const http = require("http");

// 3rd party Modules
const express = require("express");
const socketIO = require("socket.io");


const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    console.log("New user Connected");

    socket.emit('newMessage', {
        from: "Anass Bouchtaoui",
        text : "hey, how are you",
        createdAt: new Date().getTime()
    });

    socket.on("createEmail", (newEmail) =>{
        console.log("createEmail", newEmail);
    });

    socket.on("createMessage", (newMessage) =>{
        console.log("newMessage", newMessage);
    });

    socket.on("disconnect" , () => {
        console.log("User Disconnected from Server")
    });
});


server.listen(port, (err) => {
    if(err){
        return console.log(err);
    } 
    console.log(`Running correctly on port ${port}`);
});