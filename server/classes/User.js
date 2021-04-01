module.exports = class User {
    constructor(socket, nickname) {
        this.socket = socket;
        this.nickname = nickname;
        this.activeRoom = null;
        this.id = socket.id
    }

    getNickname() {
        return this.nickname
    }
}