const pg = require('pg').Pool
const dot = require('dotenv')
dot.config()
 const pool = new pg({
    host:process.env.DB_HOST,
    password:process.env.DB_PASSWORD,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME
});
module.exports = pool