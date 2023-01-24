const express = require("express");
const app = express();
const cors = require("cors");
const port = 5001;
const cookieParser = require("cookie-parser");
const { sequelize } = require("./sequelize/models/index.js");

app.use(
  express.json(),
  cors({ origin: true, credentials: true }),
  cookieParser()
);
const ticketingRouter = require('./routes/ticketing.route')
const listingRouter = require('./routes/listing.route')
const purchaseRouter = require('./routes/purchase.route')

app.use('/ticketing', ticketingRouter);
app.use('/listing', listingRouter);
app.use('/purchase', purchaseRouter);

app.listen(port, () => {
  console.log(port, "서버실행");
});

app.get("/", (req, res) => {
  res.send("성공");
});

sequelize.sync();
