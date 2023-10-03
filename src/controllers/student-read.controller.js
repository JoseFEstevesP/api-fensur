import { Course } from '#Schemas/course.schema.js';
import { Student } from '#Schemas/student.schema.js';
import { User } from '#Schemas/user.schema.js';
const getStudentData = async ({ uid, uidStudent, uidCourse }) => {
  const user = await User.findByPk(uidStudent);
  const course = await Course.findByPk(uidCourse);
  return {
    uid,
    uidStudent,
    uidCourse,
    studentName: user.name,
    studentSurname: user.surname,
    courseName: course.name,
  };
};
const studentReadController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { rows, count } = await Student.findAndCountAll({
    limit,
    page,
  });
  const details = await Promise.all(rows.map(getStudentData));
  const pages = Math.ceil(count / limit);
  const totalPage = page > pages ? pages : page;
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;
  return res.status(200).send({
    count,
    currentPage: Number(totalPage),
    nextPage: nextPage <= pages ? nextPage : null,
    previousPage: previousPage > 0 ? previousPage : null,
    limit: Number(limit),
    pages,
    details,
  });
};

export default studentReadController;
