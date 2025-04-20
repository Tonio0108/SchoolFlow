const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "rijaniaina",
    port: 5432,
    database: "gestionedt"
});

module.exports = pool;