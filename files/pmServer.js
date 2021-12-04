const express = require("express");
const crypto = require("crypto");

const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, req) => {
    res.send("hello world");
  });
});

app.listen(3000);
