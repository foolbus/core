const redis = require('redis');
const redis_url = "redis://127.0.0.1:6379/0";

console.log("Connecting to Redis at %s",redis_url);

const client = redis.createClient(redis_url,{
  detect_buffers:true,
});

client.on('error',(err) => {
  console.log(err);
  process.exit(1);
});

module.exports  = client;
