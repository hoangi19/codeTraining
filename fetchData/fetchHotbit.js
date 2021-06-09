const fetch = require('node-fetch')

// fetch data on hotbit api
async function fetchData() {
    return new Promise(function (solved) {
        fetch('https://api.hotbit.io/api/v1/allticker', { headers: { 'User-Agent': 'PostmanRuntime/7.28.0' } })
            .then(res => res.json())
            .then(json => findBITXETH(json))
            .then(json => {
                solved(json)
            })
    })
}

// find bitx_eth on json result
function findBITXETH(json) {
    const tickers = json['ticker'].filter((item) => item['symbol'] === 'BITX_ETH')
    if (tickers.length > 0) {
        return tickers[0]
    }
    return null
}

module.exports.fetchData = fetchData
