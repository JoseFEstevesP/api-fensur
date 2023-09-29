import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { Course } from './course.schema.js';

export const User = sequelize.define('user', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [6, 9],
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, 50],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.hasMany(Course, {
  foreignKey: 'uidCreator',
  sourceKey: 'uid',
});
Course.belongsTo(User, {
  foreignKey: 'uidCreator',
  targetId: 'uid',
});
