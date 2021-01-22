const RoomManager = require('../../api/RoomManager')

export default (req, res) => {
    const body = JSON.parse(req.body)
    if (req.method === 'POST' && body.name != null && body.temperature != null) {
        try {
            const roomName = body.name
            const temperature = body.temperature
            const fromHour = body.fromHour || "00:00"
            const toHour = body.toHour || "23:59"
            const weekdays = body.weekdays || ["1","2","3","4","5","6","7"]
            RoomManager.addScheduler(roomName, temperature, fromHour, toHour, weekdays)
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