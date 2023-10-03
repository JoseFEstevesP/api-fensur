import { Note } from '#Schemas/note.schema.js';

const noteUpdateController = async (req, res) => {
  const { uid, rating, uidCourse, uidTeacher, uidStudent } = req.body;
  const existingNoteById = await Note.findByPk(uid);
  if (!existingNoteById)
    return res.status(404).send({ errors: [{ uid: 'Nota no encontrada' }] });
  existingNoteById.rating = rating;
  existingNoteById.uidCourse = uidCourse;
  existingNoteById.uidTeacher = uidTeacher;
  existingNoteById.uidStudent = uidStudent;
  await existingNoteById.save();
  return res.status(201).send({ msg: 'Nota actualizada con éxito' });
};
export default noteUpdateController;
