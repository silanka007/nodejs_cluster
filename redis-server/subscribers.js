const redis = require("redis");
const FibonacciSeries = require("../math-logic/FibonacciSeries");
const subscriber = redis.createClient();

(async () => {
  try {
    await subscriber.connect();
    await subscriber.subscribe("fib-channel", (message) => {
      console.log(`message received at sub: ${message}`);
      let result = FibonacciSeries.calculateFibonacciValue(parseInt(message));
      console.log(`from subscriber: fib result = ${result}`);
    });
  } catch (error) {
    console.log(`redis client conn: ${error.message}`);
  }
})();
