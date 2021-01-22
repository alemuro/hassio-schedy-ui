import yaml from 'js-yaml'
import fs from 'fs'

const SCHEDY_CONF_FILE = process.env.SCHEDY_CONF_FILE || 'schedy-test.yaml'

class FileManager {
  load() {
    this.createIfNotExists()
    return yaml.load(fs.readFileSync(SCHEDY_CONF_FILE, 'utf8'));
  }

  save(doc) {
    this.createIfNotExists()
    fs.writeFileSync(SCHEDY_CONF_FILE, yaml.dump(doc))
  }

  createIfNotExists() {
    if (!fs.existsSync(SCHEDY_CONF_FILE)) {
      const doc = {
        "schedy": {
          "module": "hass_apps_loader",
          "class": "SchedyApp",
          "actor_type": "thermostat",
          "rooms": {}
        }
      }
      fs.writeFileSync(SCHEDY_CONF_FILE, yaml.dump(doc))
    }
  }
}

module.exports = new FileManager()
