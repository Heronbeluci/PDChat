const User = require('../classes/User')

module.exports = (app, socket) => {
    socket.on("set_nickname", (nickname, callback) => {
        let user = new User(socket, nickname)
        app.manager.addUserToRoom(user)
        callback('success')
    })

    socket.on("disconnect", (nickname) => {
        console.log(`Usuário desconectado: ${nickname}`)
    })
}