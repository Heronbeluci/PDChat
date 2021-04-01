const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

const RoomManager = require('../classes/RoomManager')

module.exports = (app) => {
    app.manager = new RoomManager(app)

    io.on("connection", socket => {
        app.socket(app, socket)
    });

    httpServer.listen(app.config.port, (err) => {
        console.log(`Servidor online na porta ${app.config.port}.`)
    });
}