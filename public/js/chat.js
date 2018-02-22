var socket = io();

function scrollToBottom(){
    // Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageheight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageheight >= scrollHeight){
        // console.log("Should Scroll");
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if (err){
            alert(err);
            window.location.href = "/";
        }else{
            console.log("No Error");
        }
    });
});

socket.on("disconnect", function() {
    console.log("Disconnected from the server");
});

socket.on("newMessage", function(message) {
    // console.log("newMessage",message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery("<li></li>");
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery("#messages").append(li);
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message){
    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target='_blank'  >My current Location</a> at ");
    var formattedTime = moment(message.createdAt).format('h:mm a');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr("href", message.fromURL);
    // li.append(a);
    // jQuery("#messages").append(li);
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from || '',
        url: message.fromURL,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
});

// socket.emit("createMessage", {
//     from:"Anass",
//     text: "Hello"
// }, function(data){
// console.log("Got it", data);
// });

jQuery("#message-form").on("submit", function(event){
    event.preventDefault();
    var messagTxtBox = jQuery("[name=message]");
    socket.emit("createMessage",{
        from: jQuery.deparam(window.location.search).name,
        text: messagTxtBox.val()
    }, function(){
        // jQuery("#userName").attr("disabled", true);
        messagTxtBox.val("");
    });

});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(){
    if(!navigator.geolocation){
        return alert("Geolocation nt supported by your browser");
    }
    locationButton.attr("disabled", true).text("Sending Location ...");
    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        locationButton.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage", {
            from: jQuery.deparam(window.location.search),
            lat : position.coords.latitude,
            lng : position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr("disabled").text("Send Location");
        alert("Unable to fetch location.");
    });
});