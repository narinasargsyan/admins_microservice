import { DataTypes as Sequelize } from "sequelize";

const adminsModel = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updateAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

const adminsOptions = {
  timestamps: false,
  schema: "public",
  freezeTableName: true,
};

export const getModel = (seq) => {
  return seq.define("Admins", adminsModel, adminsOptions);
};
