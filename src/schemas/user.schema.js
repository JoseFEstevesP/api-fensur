import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { Course } from './course.schema.js';
import { Note } from './note.schema.js';
import { Student } from './student.schema.js';
import { Teacher } from './teacher.schema.js';

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
User.hasMany(Teacher, {
  foreignKey: 'uidTeacher',
  sourceKey: 'uid',
});
Teacher.belongsTo(User, {
  foreignKey: 'uidTeacher',
  targetId: 'uid',
});
User.hasMany(Student, {
  foreignKey: 'uidStudent',
  sourceKey: 'uid',
});
Student.belongsTo(User, {
  foreignKey: 'uidStudent',
  targetId: 'uid',
});
User.hasMany(Note, {
  foreignKey: 'uidStudent',
  sourceKey: 'uid',
});
Note.belongsTo(User, {
  foreignKey: 'uidStudent',
  targetId: 'uid',
});
User.hasMany(Note, {
  foreignKey: 'uidTeacher',
  sourceKey: 'uid',
});
Note.belongsTo(User, {
  foreignKey: 'uidTeacher',
  targetId: 'uid',
});
