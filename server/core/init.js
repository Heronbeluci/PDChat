const mysql = require('mysql');
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

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'pdchat',
  password : '4nQ6S3g9OnWnnkcM',
  database : 'pdchat'
});

const RoomManager = require('../classes/RoomManager')

module.exports = (app) => {
  connection.connect(function(err) {
    if (err) {
      console.error('Falha ao conectar com a database: ' + err.stack);
      return;
    }

    app.mysql = connection

    console.log('Conexão com a database estabelecida com sucesso.')

    app.manager = new RoomManager(app)
  
    io.on("connection", socket => {
      app.socket(app, io, socket)
    });
  
    httpServer.listen(app.config.port, (err) => {
      console.log(`Servidor online na porta ${app.config.port}.`)
    });
  });
}