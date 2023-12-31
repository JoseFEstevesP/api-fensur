import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const readPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.read,
  });
  if (!validate)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  next();
};

export default readPermissions;
