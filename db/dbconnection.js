const Pool = require("pg").Pool;

//for server
const pool = new Pool({
    user: "school",
    host: "localhost",
    database: "assignment_db",
    password: "trade",
    port: "5432"
});

module.exports = pool;

