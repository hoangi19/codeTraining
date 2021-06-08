const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on("error", function(error) {
    console.error(error);
});

client.set("key", "value", function(err, reply){
    console.log(reply);
});

client.get("key", function(err, reply){
    console.log(reply);
});

