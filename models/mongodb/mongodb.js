const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://admin:admin@127.0.0.1:27017'

const client = new MongoClient(url)

// connect mongodb
async function connectDB(){
    return client.connect()        
}

// disconnect mongodb
async function disconnectDB(){
    return client.close()
}

// update bitx_eth_price_5m
function updateBITXETHprice5m(data, callbackFunc) {
    const db = client.db('test')
    db.collection('bitx_eth_candle_5m').insertOne(data, callbackFunc)
}

// get bitx_eth_price_5m value
function getBITXETHprice5m(callbackFunc){
    const db = client.db('test')
    db.collection('bitx_eth_candle_5m').find({}).toArray(callbackFunc)
}

function getCandlePriceInRange(collection, timeBegin, timeEnd, callbackFunc){
    const db = client.db('test')
    db.collection(collection).find({'time': {$gt: timeBegin, $lt: timeEnd}}).toArray(callbackFunc)
}

module.exports = {
    connectDB,
    disconnectDB,
    updateBITXETHprice5m,
    getBITXETHprice5m,
    getCandlePriceInRange
}