// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const yaml = require('js-yaml');
const fs = require('fs');

export default (req, res) => {
    res.statusCode = 200
    res.end(yaml.dump({"test":"hola"}))
    try {
        const doc = yaml.load(fs.readFileSync('/tmp/schedy2.yaml', 'utf8'));
        console.log(doc);
        res.statusCode = 200
        res.json(doc)
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