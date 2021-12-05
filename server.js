const express = require("express");
const fibonacciSeries = require("./math-logic/FibonacciSeries");
const os = require("os");
const cluster = require("cluster");

if (cluster.isMaster) {
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("online", (worker) => {
    // if(worker.id % 2 === 0) {
    //   worker.kill()
    // }
    console.log(`Worker Id: ${worker.id}, process Id: ${worker.process.pid}`);
  });
  cluster.on("exit", (worker) => {
    console.log(`worker id: ${worker.id} offline. Creating new worker...`);
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    console.log(`worker process ${cluster.worker.process.pid} has accepted the request!`)
    const { number } = req.query;
    const fibVal = fibonacciSeries.calculateFibonacciValue(parseInt(number));
    return res.send({ number, fibVal });
  });
  app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
  });
}
