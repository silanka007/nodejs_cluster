const axios = require("axios");

for(let i = 0; i < 40; i++) {
  axios.get(`http://localhost:3000?number=${i}`)
}