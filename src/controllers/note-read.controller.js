import { Course } from '#Schemas/course.schema.js';
import { Note } from '#Schemas/note.schema.js';
import { User } from '#Schemas/user.schema.js';
const getNoteData = async ({
  uid,
  rating,
  uidCourse,
  uidTeacher,
  uidStudent,
}) => {
  const teacher = await User.findByPk(uidTeacher);
  const student = await User.findByPk(uidStudent);
  const course = await Course.findByPk(uidCourse);
  return {
    uid,
    rating,
    uidCourse,
    courseName: course.name,
    uidTeacher,
    teacherName: `${teacher.name} ${teacher.surname}`,
    uidStudent,
    studentName: `${student.name} ${student.surname}`,
  };
};
const noteReadController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { rows, count } = await Note.findAndCountAll({
    limit,
    page,
  });
  const details = await Promise.all(rows.map(getNoteData));
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

export default noteReadController;
