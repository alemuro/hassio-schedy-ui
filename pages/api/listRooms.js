const RoomManager = require('../../api/RoomManager')

export default (req, res) => {
    try {
        const rooms = RoomManager.list()
        res.statusCode = 200
        res.json(rooms)
    } catch (e) {
        if (e.code == "ENOENT") {
            res.statusCode = 200
            res.json({
                name: 'File not found'
            })
        }
        else {
            console.log(e)
            res.statusCode = 500
            res.json({
                name: 'Unhandled error'
            })
        }
    }

}