const Pool = require("pg").Pool;

//for server
const pool = new Pool({
    user: "prakash",
    host: "localhost",
    database: "school",
    password: "",
    port: "5432"
});

module.exports = pool;

