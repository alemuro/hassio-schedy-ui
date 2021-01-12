const RoomManager = require('../../api/RoomManager')

export default (req, res) => {
    const body = JSON.parse(req.body)
    if (req.method === 'POST' && body.name != null) {
        try {
            console.log(body)
            RoomManager.remove(body.name)
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