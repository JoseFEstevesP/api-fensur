import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const studentPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = await validatePermissions({
    uidRol,
    per: permissions.student,
  });
  if (!validate)
    return res.status(401).send({ errors: [{ uid: 'Usuario no autorizado' }] });
  next();
};

export default studentPermissions;
