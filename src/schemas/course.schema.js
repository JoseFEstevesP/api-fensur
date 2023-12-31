import { sequelize } from '#Config/db.js';
import { DataTypes } from 'sequelize';
import { Note } from './note.schema.js';
import { Student } from './student.schema.js';
import { Teacher } from './teacher.schema.js';

export const Course = sequelize.define('course', {
  uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Course.hasMany(Teacher, {
  foreignKey: 'uidCourse',
  sourceKey: 'uid',
});
Teacher.belongsTo(Course, {
  foreignKey: 'uidCourse',
  targetId: 'uid',
});
Course.hasMany(Student, {
  foreignKey: 'uidCourse',
  sourceKey: 'uid',
});
Student.belongsTo(Course, {
  foreignKey: 'uidCourse',
  targetId: 'uid',
});
Course.hasMany(Note, {
  foreignKey: 'uidCourse',
  sourceKey: 'uid',
});
Note.belongsTo(Course, {
  foreignKey: 'uidCourse',
  targetId: 'uid',
});
