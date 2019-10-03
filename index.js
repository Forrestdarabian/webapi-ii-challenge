const express = require("express");
const postsRouter = require("./posts/postsRouter");
const server = express();
const port = process.env.PORT || 1000;
server.use(express.json());
server.use("/api/posts", postsRouter);
server.listen(port, () => console.log("server is up and running :)"));
