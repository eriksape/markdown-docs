require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbDatabase: process.env.DB_DATABASE,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
};

module.exports = { config: config };