import { Note } from '#Schemas/note.schema.js';

const noteSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const note = await Note.findByPk(uid);
  if (!note)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningúna nota' }] });
  return res.status(200).send(note);
};

export default noteSearchItemController;
