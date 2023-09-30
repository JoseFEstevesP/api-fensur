import { Course } from '#Schemas/course.schema.js';
import { Teacher } from '#Schemas/teacher.schema.js';
import { User } from '#Schemas/user.schema.js';
const getTeacherData = async ({ uid, uidTeacher, uidCourse }) => {
  const user = await User.findByPk(uidTeacher);
  const course = await Course.findByPk(uidCourse);
  return {
    uid,
    uidTeacher,
    uidCourse,
    teacherName: user.name,
    teacherSurname: user.surname,
    courseName: course.name,
  };
};

const teacherReadController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { rows, count } = await Teacher.findAndCountAll({
    limit,
    page,
  });
  const teachersWithDetails = await Promise.all(rows.map(getTeacherData));
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
    teachersWithDetails,
  });
};

export default teacherReadController;
