const express = require("express");
const { publisher1, publisher2 } = require("./publishers");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const { number } = req.query;
  if (number % 2 === 0) {
    publisher1(number);
  } else {
    publisher2(number);
  }
  return res.send(
    "Request received successfully. check console for result of the evaluation..."
  );
});

app.listen(PORT, () => {
  console.log("listening on port: " + PORT);
});
