import yaml from 'js-yaml'
import fs from 'fs'

class FileManager {
    constructor() {
        this.file = '/tmp/schedy2.yaml'
    }

    load() {
        return yaml.load(fs.readFileSync(this.file, 'utf8'));
    }

    save(doc) {
        fs.writeFileSync(this.file, yaml.dump(doc))
    }
}

module.exports = new FileManager()
