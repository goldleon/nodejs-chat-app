var socket = io();

socket.on("connect", function() {
    console.log("Connected to server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from the server");
});

socket.on("newMessage", function(message) {
    console.log("newMessage",message);
    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function(message){
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'  >My current Location</a>");

    li.text(`${message.from}: `);
    a.attr("href", message.fromURL);
    li.append(a);
    jQuery("#messages").append(li);
});

// socket.emit("createMessage", {
//     from:"Anass",
//     text: "Hello"
// }, function(data){
// console.log("Got it", data);
// });

jQuery("#message-form").on("submit", function(event){
    event.preventDefault();
    socket.emit("createMessage",{
        from: jQuery("#userName").val(),
        text: jQuery("[name=message]").val()
    }, function(){

    });
    jQuery("#userName").attr("disabled", true);
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(){
    if(!navigator.geolocation){
        return alert("Geolocation nt supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit("createLocationMessage", {
            from: jQuery("#userName").val(),
            lat : position.coords.latitude,
            lng : position.coords.longitude
        });
    }, function(){
        alert("Unable to fetch location.");
    });
});