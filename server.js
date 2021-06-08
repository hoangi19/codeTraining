const { MongoClient } = require("mongodb");
const url = "mongodb://admin:admin@127.0.0.1:27017";

var http = require('http');
var server = require("http").Server();
// var server = http.createServer(function (req, res) {
//   console.log("hi");
//   // res.writeHead(200, {'Content-Type': 'text/html'});
//   // res.write('Hello World!');
//   // res.end();
// });





var io = require("socket.io")(server);

server.listen(8080);

io.on("connection", function (socket) {
  console.log("send data");
  sendDataToClient(socket);
  socket.on("getData", () => sendDataToClient(socket));
});

function sendDataToClient(socket) {
  const clientDB = new MongoClient(url);
  var data = "";
  try {
    clientDB.connect().then(() => {
      var db = clientDB.db('test');
      db.collection("documents").find({}).sort({_id: -1}).limit(1).toArray(function(err, result) {
        if (err) throw err;
        data = result[0];
        socket.emit("serverSendData", data["buy"]);
      });
    })
  } catch (error) {
    console.log(error);
  }
  finally {
    clientDB.close();
  }
}
