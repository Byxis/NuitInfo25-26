import pkg from "pg";

const { Pool } = pkg;
// Récupération de la variable d'environnement Docker

const pool = new Pool({
    connectionString:
        process.env.DATABASE_URL ||
        "postgres://segfault:segfault@localhost:5440/segfault",
});

export default pool;
