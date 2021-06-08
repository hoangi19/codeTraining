const io = require('socket.io-client');
var socket = io.connect('http://localhost:8080', {reconnect: true});

socket.on("serverSendData", function(data)
{
    console.log(data);
});

socket.emit("getData", function(data)
{
    console.log(data);
});