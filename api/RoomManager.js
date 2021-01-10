const FileManager = require('./FileManager')

class RoomManager {
    constructor() {}

    list() {
        const doc = FileManager.load()
        return Object.keys(doc.schedy.rooms || {})
    }

    create(roomName) {
        const doc = FileManager.load()
        if (doc.schedy.rooms == null)
            doc.schedy.rooms = {}

        doc.schedy.rooms[roomName] = {}
        FileManager.save(doc)
    }

    remove(roomName) {
        const doc = FileManager.load()
        if (doc.schedy.rooms == null)
            doc.schedy.rooms = {}

        delete doc.schedy.rooms[roomName]
        FileManager.save(doc)
    }
}

module.exports = new RoomManager()