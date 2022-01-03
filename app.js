const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const plantsRouter = require("./routes/planta");
const estadoRouter = require("./routes/estado");
const fileRouter = require("./routes/file");
const cors = require("cors");
const compression = require("compression");
const app = express();

app.use(cors());
app.use(compression());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/", indexRouter);
app.use("/auth", usersRouter);
app.use("/estado", estadoRouter);
app.use("/plants", plantsRouter);
app.use("/file", fileRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "x-acsess-token, Origin, Content-Type,Accept"
  );
  next();
});


module.exports = app;
