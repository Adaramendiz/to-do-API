import { Sequelize } from "sequelize";

const db = new Sequelize({
  host: "localhost",
  username: "postgres",
  database: "todos_db",
  port: 5432,
  password: "root",
  dialect: "postgres",
  dialectOptions: { ssl: { required: true, rejectUnauthorized: false } },
});

export default db;
