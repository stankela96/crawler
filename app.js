const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const createError = require("http-errors");
const http = require("http");
const app = express();

const server = http.createServer(app);
const pageRoute = require("./routes/pageRoute");

dotenv.config();

app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", pageRoute);

app.use(function (req, res, next) {
  next(createError(404));
});

const PORT = process.env.PORT ? process.env.PORT : 3000;
server.listen(PORT, () => console.log("Server up and running on: http://localhost:" + PORT));
