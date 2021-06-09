const redis = require('redis')

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})

// push bitx_eth_price to array
function lpushBITXETH(price, callbackFunc) {
    redisClient.lpush('BITX_ETH_price', price, callbackFunc)
}

// set last update time
function setLastUpdate(lastUpdate, callbackFunc) {
    redisClient.set('lastUpdate', lastUpdate, callbackFunc)
}

// get last update time
function getLastUpdate(callbackFunc) {
    redisClient.get('lastUpdate', callbackFunc)
}

//get array bitx_eth_price
function getLrangeBITXEHT(callbackFunc){
    redisClient.lrange('BITX_ETH_price', 0, -1, callbackFunc)
}

// set bitx_eth_price_5m
function setBITXETHprice5m(data, callbackFunc){
    let js = JSON.stringify(data)
    redisClient.set('bitx_eth_candle_5m', js, callbackFunc)
}

// get bitx_eth_price_5m
function getBITXETHprice5m(callbackFunc){
    redisClient.get('bitx_eth_candle_5m', callbackFunc)
}

module.exports = {
    lpushBITXETH,
    setLastUpdate,
    getLastUpdate,
    getLrangeBITXEHT,
    setBITXETHprice5m,
    getBITXETHprice5m
}