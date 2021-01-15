import yaml from 'js-yaml'
import fs from 'fs'

const SCHEDY_CONF_FILE = process.env.SCHEDY_CONF_FILE || '/tmp/schedy2.yaml'

class FileManager {
    load() {
        return yaml.load(fs.readFileSync(SCHEDY_CONF_FILE, 'utf8'));
    }

    save(doc) {
        fs.writeFileSync(SCHEDY_CONF_FILE, yaml.dump(doc))
    }
}

module.exports = new FileManager()
