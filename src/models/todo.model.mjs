import { DataTypes } from "sequelize";
import db from "../utils/database.mjs";

const Todo = db.define("todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN({multi:true}),
    allowNull: true,
  },
});

export default Todo;