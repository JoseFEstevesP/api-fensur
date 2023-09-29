import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const Student = sequelize.define('student', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});
