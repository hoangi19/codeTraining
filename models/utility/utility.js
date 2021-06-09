function calcTime(time) {
    switch (time) {
    case '5m':
        return 5 * 60 * 1000
    case '15m':
        return 15 * 60 * 1000
    case '30m':
        return 30 * 60 * 1000
    }
}

module.exports = {
    calcTime
}