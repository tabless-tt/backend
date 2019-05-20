const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../routers/auth/authRouter");
const usersRouter = require("../routers/users/usersRouter");
const tabsRouter = require('../routers/tabs/tabsRouter')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/", authRouter);
server.use("/api/users", usersRouter);
server.use('/api/tabs', tabsRouter)

server.get("/", (req, res) => {
  res.send("api running");
});

module.exports = server;
