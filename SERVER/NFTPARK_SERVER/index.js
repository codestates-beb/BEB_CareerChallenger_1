const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 5000;

app.use(
  express.json(),
  cors({ origin: true, credentials: true }),
  cookieParser()
);

app.listen(port, () => {
  console.log(port, "서버실행");
});

require("./routes/main.route.js")(app);
