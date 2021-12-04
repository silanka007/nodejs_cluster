process.env.UV_THREADPOOL_SIZE = 1;

const express = require("express");
const cluster = require("cluster");
const crypto = require("crypto");

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const app = express();

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, resp) => {
      res.send("hi there");
    });
  });

  app.listen(3000);
}
