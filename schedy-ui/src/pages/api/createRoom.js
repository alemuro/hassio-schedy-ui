const RoomManager = require('../../api/RoomManager')

export default (req, res) => {
    const body = JSON.parse(req.body)
    if (req.method === 'POST' && body.name != null && body.actor != null) {
        try {
            RoomManager.create(body.name, [body.actor])
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