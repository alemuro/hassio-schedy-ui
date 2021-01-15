const RoomManager = require('../../api/RoomManager')

export default (req, res) => {
    const body = JSON.parse(req.body)
    if (req.method === 'POST' && body.roomName != null && body.schedulerName != null) {
        try {
            const roomName = body.roomName
            const schedulerName = body.schedulerName
            RoomManager.deleteScheduler(roomName, schedulerName)
            res.statusCode = 200
            res.json({message: "ok"})
        } catch (e) {
            console.log(e)
            res.statusCode = 500
            res.json({
                name: 'Unhandled error'
            })
        }
    }
    else {
        res.statusCode = 400
        res.json({
            error: '400'
        })
    }
}