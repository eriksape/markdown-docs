const { Pool } = require('pg')
const { config } = require('../config');

const connectionString = `postgresql://${config.dbUsername}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbDatabase}`;

class Connection {
    constructor() {
        this.client = new Pool({connectionString: connectionString})
        this.dbName = config.dbName;
    };
}

module.exports = Connection;