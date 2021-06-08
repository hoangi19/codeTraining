const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");
const { exit } = require("process");
const express = require("express");
const socket = require("socket.io");

const url = "mongodb://admin:admin@127.0.0.1:27017";

const redis = require('redis');

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

async function main() {
    try {
        setInterval(fetchAndStoreData, 20000);
    }
    catch (e) {
        console.error(e);
    }

}

async function fetchAndStoreData() {
    const client = new MongoClient(url);
    try {

        await client.connect();
        var db = client.db('test');
        // await listDatabases(client);
        // let res = await fetch('https://www.hotbit.io/public/markets');
        await fetch('https://api.hotbit.io/api/v1/allticker', { headers: { "User-Agent": "PostmanRuntime/7.28.0" } })
            .then(res => res.json())
            .then(json => findBITXETH(json))
            .then(json => {
                // console.log(json);
                let data = {
                    "buy": json["buy"],
                    "open": json["open"],
                    "high": json["high"],
                    "low": json["low"],
                    "close": json["close"]
                };
                json = JSON.stringify(data);
                redisClient.lpush("BITX_ETH_price", json, function (err, reply) {
                    if (err) {
                        console.log(err);
                    }
                    let timeNow = new Date().getTime() / 1000;
                    redisClient.get("lastUpdate", function (err, reply) {
                        if (err) {
                            console.log(err);
                        }
                        if (reply === null || timeNow - reply > 300000) {
                            redisClient.set("lastUpdate", timeNow);
                            db.collection('documents').insertOne(data, function (err, res) {
                                if (err == null) {
                                    console.log("yess");
                                }
                                else {
                                    console.log(err);
                                }
                            });
                        }
                    })
                    console.log(reply);
                });

            });
    }
    catch (e) {

    }
    finally {
        await client.close();
    }
}

function findBITXETH(json) {
    for (let i in json["ticker"]) {
        if (json["ticker"][i]["symbol"] == "BITX_ETH") {
            // console.log(json["Content"][i]);
            return json["ticker"][i];
        }
    }
}

main().catch(console.error);
/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};