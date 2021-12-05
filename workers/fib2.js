const FibonacciSeries = require("../math-logic/FibonacciSeries");

process.on("message", (number) => {
  // console.log(`fib evaluation processing on ${process.pid}...fib 2`);
  const result = FibonacciSeries.calculateFibonacciValue(parseInt(number));
  process.send({ result, number });
});
