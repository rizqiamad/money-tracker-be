require("dotenv").config();

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = {
  development: {
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
