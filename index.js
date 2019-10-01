const express = require("express");
const postsRouter = require("./posts/postsRouter");
const server = express();
server.use(express.json());
server.use(express.json());
server.use("/api/posts", postsRouter);
server.listen(1000, () => console.log("server is up and running :)"));
