import { Note } from '#Schemas/note.schema.js';

const noteRegisterController = async (req, res) => {
  const { uid, rating, uidCourse, uidTeacher, uidStudent } = req.body;
  const existingNoteById = await Note.findByPk(uid);
  if (existingNoteById)
    return res
      .status(409)
      .send({ errors: [{ uid: 'Ya existe una nota con ese id registrado' }] });
  const note = await Note.create({
    uid,
    rating,
    uidCourse,
    uidTeacher,
    uidStudent,
  });
  await note.save();
  return res.status(201).send({ msg: 'Nota registrada con éxito' });
};
export default noteRegisterController;
