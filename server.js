const server = require('http').Server()
const io = require('socket.io')(server)
const mongodb = require('./models/mongodb/mongodb')
const redis = require('./models/redis/redis')

async function main() {
    try {
        await mongodb.connectDB()
        server.listen(8080)
    } catch (error) {
        console.log(error)
    }

}

main().catch(console.error)

io.on('connection', function (socket) {
    console.log('send data')
    // sendDataToClient(socket)
    socket.on('getData', () => sendDataToClient(socket))
})

function sendDataToClient(socket) {
    redis.getBITXETHprice5m(function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            socket.emit('serverSendData', result)
        }

    })
}
