import { Course } from '#Schemas/course.schema.js';
import { Note } from '#Schemas/note.schema.js';
import { User } from '#Schemas/user.schema.js';
const getUserNoteData = async ({ uid, rating, uidCourse, uidTeacher }) => {
  const teacher = await User.findByPk(uidTeacher);
  const course = await Course.findByPk(uidCourse);
  return {
    uid,
    rating,
    uidCourse,
    courseName: course.name,
    uidTeacher,
    teacherName: `${teacher.name} ${teacher.surname}`,
  };
};

const userNoteController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { id } = req;
  const { rows, count } = await Note.findAndCountAll({
    where: { uidStudent: id },
    limit,
    page,
  });
  if (!rows.length)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna nota' }] });
  const details = await Promise.all(rows.map(getUserNoteData));
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

export default userNoteController;
