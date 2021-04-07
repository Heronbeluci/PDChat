const User = require('../classes/User')

var users = {}

module.exports = (app, io, socket) => {
    socket.on("set_nickname", (nickname, callback) => {
        let user = new User(socket, nickname)
        app.manager.addUserToRoom(user)
        users[socket.id] = user

        app.mysql.query('SELECT * from history', function (error, results, fields) {
            if (error) throw error;
            callback('success', results)
        });
    })

    socket.on("chat_message", (data, callback) => {
        let user = users[socket.id]
        if (user == undefined) { return callback('nickname-needed')}
        let nickname = user.getNickname()
        let date = new Date(data.date)

        socket.broadcast.emit("chat_message", {
            id: data.id,
            nickname: nickname,
            message: data.message,
            date: date
        })

        app.mysql.query('INSERT INTO `history` (`id`, `owner`, `message`, `date`) VALUES (?,?,?,?);', [
            data.id, nickname, data.message, date
        ], function (error, results, fields) {
            if (error) throw error;

            callback('success')
        });
    })

    socket.on("disconnect", (nickname) => {
        console.log(`Usuário desconectado: ${nickname}`)
    })
}