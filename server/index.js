const express = require("express");
const redisAdapter = require("socket.io-redis");
const cors = require("cors");
const socketEvents = require("./config/socket");

const app = express();
const PORT = 4000;

app.use(cors({ origin: true, credentials: true }));

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: '*' }
})
server.listen(PORT, (req, res) => {
  console.log(`server is running at ${PORT}`);
});

// const io = SocketIo(server);
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

socketEvents(io);