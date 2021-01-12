const shortid = require('shortid')
const FileManager = require('./FileManager')

class RoomManager {
    constructor() {}

    list() {
        const doc = FileManager.load()
        return doc.schedy.rooms || {}
    }

    addScheduler(roomName, temperature, fromHour, toHour, weekdays) {
        const doc = FileManager.load()
        if (doc.schedy.rooms[roomName] != null) {
            if (doc.schedy.rooms[roomName].schedule == null) {
                doc.schedy.rooms[roomName].schedule = []
            }
            doc.schedy.rooms[roomName].schedule.splice(
                doc.schedy.rooms[roomName].schedule.length - 1,
                0,
                {
                    v: parseFloat(temperature),
                    start: fromHour,
                    end: toHour,
                    weekdays: weekdays.toString(),
                    name: shortid.generate()
                }
            )

            FileManager.save(doc)
        }
    }

    create(roomName, actorNames) {
        const doc = FileManager.load()
        if (doc.schedy.rooms == null)
            doc.schedy.rooms = {}

        // instantiate room
        if (doc.schedy.rooms[roomName] == null) {
            doc.schedy.rooms[roomName] = {
                actors: {},
                schedule: [{
                    v: 'OFF',
                    name: 'default'
                }]
            }
        }

        // instantiate actor
        for (let actor of actorNames) {
            doc.schedy.rooms[roomName].actors[actor] = {}
        }

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