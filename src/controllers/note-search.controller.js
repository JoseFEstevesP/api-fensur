import { Course } from '#Schemas/course.schema.js';
import { Note } from '#Schemas/note.schema.js';
import { User } from '#Schemas/user.schema.js';
import { Op } from 'sequelize';
const getNoteData = async ({ uidCourse, uidTeacher, uidStudent }) => {
  const teacher = await User.findByPk(uidTeacher);
  const student = await User.findByPk(uidStudent);
  const course = await Course.findByPk(uidCourse);
  return {
    uidCourse,
    courseName: course.name,
    uidTeacher,
    teacherName: `${teacher.name} ${teacher.surname}`,
    uidStudent,
    studentName: `${student.name} ${student.surname}`,
  };
};
const noteSearchController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.body;
  console.log('noteSearchController -> search:', search);
  const { rows, count } = await Note.findAndCountAll({
    where: {
      [Op.or]: [
        { uidCourse: { [Op.iLike]: search } },
        { uidTeacher: { [Op.iLike]: search } },
        { uidStudent: { [Op.iLike]: search } },
      ],
    },
    limit,
    page,
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna nota' }] });
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

export default noteSearchController;
