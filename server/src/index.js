const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

mongoose.connect("mongodb://localhost:2717/travel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/logs", logs);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
app.post("/api/logs", logs);

// 返回错误页面
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 1337;
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
