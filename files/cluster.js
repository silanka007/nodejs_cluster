process.env.UV_THREADPOOL_SIZE = 1;

const express = require("express");
const cluster = require("cluster");
const crypto = require("crypto");
const fibonacciSeries = require("../math-logic/FibonacciSeries");
const os = require("os");

console.log(cluster.Worker())

// if (cluster.isMaster) {
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
//   cluster.fork();
// } else {
//   const app = express();

//   app.get("/", (req, res) => {
//     crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, resp) => {
//       res.send("hi there");
//     });
//   });

//   app.listen(3000);
// }

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

