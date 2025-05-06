const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "Antonio0108Andria",
    port: 5432,
    database: "gestionedt"
});

module.exports = pool;