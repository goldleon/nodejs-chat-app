// Build in Modules
const path = require("path");
const http = require("http");

// 3rd party Modules
const express = require("express");
const socketIO = require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));


io.on("connection", (socket) => {
    console.log("New user Connected");

    // socket.emit('newMessage', {
    //     from: "Anass Bouchtaoui",
    //     text : "hey, how are you",
    //     createdAt: new Date().getTime()
    // });

    // socket.emi from admin text welcome to the chat app
    
    // socket.broadcast.emit from admin text new user joined
    

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and Room name are required !!");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin","Welcom to the chat app"));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} Joined`));
        callback();
    });

    
    socket.on("createEmail", (newEmail) =>{
        console.log("createEmail", newEmail);
    });

    socket.on("createMessage", (newMessage, callback) =>{
        // console.log("newMessage", newMessage);
        var user = users.getUser(socket.id);

        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit("newMessage", generateMessage(user.name, newMessage.text));
        }
        
        callback();
        // socket.broadcast.emit("newMessage", {
        //     from: newMessage.from,
        //     text : newMessage.text,
        //     createdAt : new Date().getTime()
        // });
    });

    socket.on("createLocationMessage", (coords) => {
        var user  = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.lat, coords.lng));
        }
    });

    socket.on("updateUserList", () => {

    });

    socket.on("disconnect" , () => {
        console.log("User Disconnected from Server");
        // saving any potentiel removed user
        var user = users.removeUser(socket.id);
        if(user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left the chat room`));
        }

    });
});


server.listen(port, (err) => {
    if(err){
        return console.log(err);
    } 
    console.log(`Running correctly on port ${port}`);
});