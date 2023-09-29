import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const Teacher = sequelize.define('teacher', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});
