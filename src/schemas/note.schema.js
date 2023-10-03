import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';

export const Note = sequelize.define('note', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  rating: {
    type: DataTypes.STRING(3000),
    allowNull: false,
    defaultValue: '',
  },
});
