const fetchData = require('./fetchData/fetchHotbit')
const redis = require('./models/redis/redis')
const mongodb = require('./models/mongodb/mongodb')

async function main() {
    try {
        await mongodb.connectDB()
        setInterval(fetchAndStoreData, 20000)
    }
    catch (e) {
        console.error(e)
        await mongodb.disconnectDB()
    }

}


async function fetchAndStoreData() {
    try {
        //fetch data from hotbit 
        const js = await fetchData.fetchData()
        const price = js['buy']

        // get time of last update
        redis.getLastUpdate(function (err, lastUpdate) {
            if (err) {
                console.log(err)
            }
            else {
                const timeNow = new Date().getTime()
                //get bitx_eth_price_5m in redis 
                redis.getBITXETHprice5m(function (err, bitx_eth_candle_5m) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        if (bitx_eth_candle_5m === null) { // create new if bitx_eth_candle_5m not exists
                            let data = {
                                'open': price,
                                'high': price,
                                'low': price,
                                'close': price
                            }

                            redis.setBITXETHprice5m(data, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                        else {
                            // redis luu data dang string -> chuyen sang json
                            let data = JSON.parse(bitx_eth_candle_5m)

                            // cap nhat bitx_eth_candle_5m
                            data = {
                                'open': data['open'],
                                'high': Math.max(data['high'], price),
                                'low': Math.min(data['low'], price),
                                'close': price
                            }
                            redis.setBITXETHprice5m(data, function (err) {
                                if (err) {
                                    console.log(err)
                                }
                            })

                            if (timeNow - lastUpdate >= 300000) { // neu chua update db sau 5p thi update db
                                redis.setLastUpdate(timeNow, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                })
                                //update mongodb
                                data['time'] = timeNow
                                mongodb.updateBITXETHprice5m(data, function (err) {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else{
                                        console.log('stored to db')
                                    }
                                })
                            }
                        }
                    }
                })
            }
        })
    }
    catch (e) {
        console.log(e)
    }
}

main().catch(console.error)