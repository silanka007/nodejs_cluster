const express = require("express");
const fibonacciSeries = require("./math-logic/FibonacciSeries");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const { number } = req.query;
  const fibVal = fibonacciSeries.calculateFibonacciValue(parseInt(number));
  return res.send({ number, fibVal });
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
