const User = require('../classes/User')

var users = {}

module.exports = (app, io, socket) => {
    socket.on("set_nickname", (nickname, callback) => {
        let user = new User(socket, nickname)
        app.manager.addUserToRoom(user)
        users[socket.id] = user
        callback('success')
    })

    socket.on("chat_message", (data, callback) => {
        socket.emit('teste', 'teste')
        let user = users[socket.id]
        if (user == undefined) { return callback('nickname-needed')}
        let nickname = user.getNickname()


        socket.broadcast.emit("chat_message", {
            nickname: nickname,
            message: data.message,
            date: data.date
        })
        // var datestring = (d.getFullYear()+"/"+("0"+(d.getMonth()+1)).slice(-2)+"/0" + d.getDate()).slice(-2) + "-" +  + "-" +  + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
        console.log(nickname+':',data)
        callback('success')
    })

    socket.on("disconnect", (nickname) => {
        console.log(`Usuário desconectado: ${nickname}`)
    })
}