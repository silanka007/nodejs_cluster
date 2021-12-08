const express = require("express");
const axios = require("axios");
const redis = require("redis");
const redisClient = redis.createClient(6379, "127.0.0.1");

const redisMiddleware = require("./redis-middleware");

const app = express();
const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error.message)
  }
})()

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

app.get("/users", redisMiddleware(redisClient), async (req, res) => {
  try {
    const users = await axios.get("https://jsonplaceholder.typicode.com/users");
    await redisClient.set("users", JSON.stringify(users.data), { EX: 30 });
    setTimeout(() => {
      return res.send(users.data);
    }, 3000);
  } catch (error) {
    console.log(error.message);
  }
});
