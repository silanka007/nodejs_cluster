const express = require("express");
const childProcess = require("child_process");
const cluster = require("cluster");

if (cluster.isMaster) {
  const worker1 = childProcess.fork("./workers/fib1.js");
  const worker2 = childProcess.fork("./workers/fib2.js");
  // console.log({worker1, worker2})
  worker1.on("message", (res) => {
    console.log(`result from fib 1: ${res.result}, number: ${res.number}`);
  });
  worker2.on("message", (res) => {
    console.log(`result from fib 2: ${res.result}, number: ${res.number}`);
  });

  cluster.on("online", (worker) => {
    worker.on("message", (number) => {
      if (number % 2 === 0) {
        worker1.send(number);
      } else {
        worker2.send(number);
      }
    });
  });

  // needed to fork child processes from cluster so as to start express server
  cluster.fork();
  cluster.fork();
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    const { number } = req.query;
    process.send(number);
    return res.send(
      "Request received successfully. check console for result of the evaluation..."
    );
  });

  app.listen(PORT, () => {
    console.log("listening on port: " + PORT);
  });
}
