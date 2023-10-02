import { User } from '#Schemas/user.schema.js';

const userSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const existeUserById = await User.findByPk(uid);
  if (!existeUserById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún usuario' }] });
  return res.status(200).send(existeUserById);
};

export default userSearchItemController;
