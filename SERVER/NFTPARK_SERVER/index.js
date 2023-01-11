const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

app.listen(port, () => {
  console.log(port, "서버실행");
});

require("./routes/main.route.js")(app);
