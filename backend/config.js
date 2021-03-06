require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    dbURL: process.env.DATABASE_URL,
};

module.exports = { config };
