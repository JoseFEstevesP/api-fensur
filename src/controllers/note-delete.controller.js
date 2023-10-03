import { Note } from '#Schemas/note.schema.js';
const noteDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingNoteById = await Note.findByPk(uid);
  if (!existingNoteById)
    return res.status(401).send({ errors: [{ uid: 'Nota no encontrada' }] });
  await existingNoteById.destroy();
  return res.send({ msg: 'Nota eliminado' });
};
export default noteDeleteController;
