const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const redisClient = redis.createClient();
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(`redis client conn: ${error.message}`);
  }
})();

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

// /fib?number=<int_value>
app.get("/fib", async (req, res) => {
  try {
    const { number } = req.query;
    await redisClient.publish("fib-channel", number);
    console.log("message published successfully...")
    return res.send(
      "request received and processed successfully. check your email..."
    );
  } catch (error) {
    console.log(`from app-fib route: ${error.message}`);
  }
});
