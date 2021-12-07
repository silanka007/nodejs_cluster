const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send(`request received on port ${PORT}`);
});
