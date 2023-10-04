import { Rol } from '#Schemas/rol.schema.js';
const userRolController = async (req, res) => {
  const { uidRol } = req;
  const existingUserRolById = await Rol.findByPk(uidRol);
  if (!existingUserRolById)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  const { permissions } = existingUserRolById;
  return res.send({ permissions });
};
export default userRolController;
