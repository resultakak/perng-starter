require("dotenv").config();

const db = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: "postgres",
  dialectOptions: {
    bigNumberStrings: true,
  },
};

module.exports = {
  development: db,
  test: db,
  production: db,
};
