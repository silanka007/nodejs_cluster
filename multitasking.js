// reducing the libuv threadpool to 1
process.env.UV_THREADPOOL_SIZE = 2;

const https = require("https");
const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

const fetchData = () => {
  https
    .request("https://jsonplaceholder.typicode.com/todos/1", (res) => {
      let result = "";
      res.on("data", (e) => {
        result += e;
      });
      res.on("end", (e) => {
        result = JSON.parse(result);
        // console.log({result})
        console.log("https: ", Date.now() - start);
      });
    })
    .end();
};

const hash = () => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", (err, buffer) => {
    console.log("hash: ", Date.now() - start);
  });
};

fetchData();

fs.readFile("./multitasking.js", (err, file) => {
  const result = file.toString();
  // console.log({result})

  console.log("fs: ", Date.now() - start);
});

hash();
hash();
hash();
hash();
