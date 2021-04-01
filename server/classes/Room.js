module.exports = class Room {
    constructor(title) {
        this.title = title;
        this.users = {};
    }

    getUsers() {
        return this.users
    }

    remUser(user) {
        // user.activeRoom.remUser(user)

        console.log(`[${this.title}]: Usuário desconectado: ${user.getNickname()}`)
    }

    addUser(user) {
        if (user.activeRoom) {
            user.activeRoom.remUser(user)
        }

        this.users[user.id] = user
        user.activeRoom = this

        console.log(`[${this.title}]: Usuário conectado: ${user.getNickname()}`)
    }
}