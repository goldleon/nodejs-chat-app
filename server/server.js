// Build in Modules
const path = require("path");
const http = require("http");

// 3rd party Modules
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    console.log("New user Connected");

    // socket.emit('newMessage', {
    //     from: "Anass Bouchtaoui",
    //     text : "hey, how are you",
    //     createdAt: new Date().getTime()
    // });

    // socket.emi from admin text welcome to the chat app
    socket.emit("newMessage", generateMessage("Admin","Welcom to the chat app"));
    // socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit("newMessage", generateMessage("Admin", "New User Joined"));


    
    socket.on("createEmail", (newEmail) =>{
        console.log("createEmail", newEmail);
    });

    socket.on("createMessage", (newMessage, callback) =>{
        console.log("newMessage", newMessage);
        io.emit("newMessage", generateMessage(newMessage.from, newMessage.text));
        callback("This is from the server");
        // socket.broadcast.emit("newMessage", {
        //     from: newMessage.from,
        //     text : newMessage.text,
        //     createdAt : new Date().getTime()
        // });
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