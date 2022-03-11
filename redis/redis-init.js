const Redis = require('redis');
const { promisify } = require('util');

const client = Redis.createClient({
  legacyMode: true,
  url: 'redis://ec2-3-230-86-252.compute-1.amazonaws.com:6379',
  password: process.env.redis_password
});

const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

client.connect();

client.on('connect', () => {
  console.log('connected to redis')
})

client.on("error", function (err) {
  console.log("Error " + err);
});

process.on('SIGINT', () => {
  client.quit();
})

module.exports = client;