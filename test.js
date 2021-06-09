const fetchData = require('./fetchData/fetchHotbit')
async function test() {
    const js = await fetchData.fetchData()
    console.log(js)
}

// test()

const redis = require('./models/redis/redis')
// const timeNow = new Date().getTime() / 1000
// redis.setLastUpdate(timeNow, function(err, reply){
//     if (err)
//     {
//         console.log(err)
//     }
//     else
//     {
//         console.log(reply)
//     }
// })

redis.getLastUpdate(function (err, reply) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(reply)
    }
})

redis.getLrangeBITXEHT(function (err, reply) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(reply)
    }
})

const data = {
    'open': 12312312,
    'close': 123123,
    'high': 23123,
    'low': 13212
}

redis.setBITXETHprice5m(data, function (err, reply) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(reply)
    }
})

redis.getBITXETHprice5m(function(err, reply){
    if (err){
        console.log(err)
    }
    else {
        let data = JSON.parse(reply)
        console.log(data['open'])
    }
})