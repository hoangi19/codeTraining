var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
});

var io = require("socket.io")(server);

server.listen(8080);

io.on("connection", function(socket)
{
   sendDataToClient(socket); 
});

function sendDataToClient(socket)
{
    var data = "test";
    socket.emit("serverSendData", data);
}
