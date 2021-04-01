const Room = require('./Room')

module.exports = class RoomManager {
    constructor(app) {
        this.app = app
        this.rooms = {};
    }

    getRooms() {
        return this.rooms
    }

    addUserToRoom(user, roomName) {
        if (roomName == undefined)
            roomName = this.app.config.publicRoomName

        if (this.rooms[roomName]) {
            this.rooms[roomName].addUser(user)
        } else {
            this.rooms[roomName] = new Room(roomName)
        }
    }
}