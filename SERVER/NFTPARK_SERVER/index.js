const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const port = 5000;
require("dotenv").config();

// redis

app.use(
  express.json(),
  cors({ origin: true, credentials: true }),
  cookieParser()
);

app.listen(port, () => {
  console.log(port, "서버실행");
});

require("./routes/main.route.js")(app);
