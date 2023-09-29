import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';
import { Teacher } from '#Schemas/teacher.schema.js';
import { User } from '#Schemas/user.schema.js';

const teacherUpdateController = async (req, res) => {
  const { uid, uidTeacher, uidCourse } = req.body;
  const existingTeacherById = await Teacher.findByPk(uid);
  const existingUser = await User.findByPk(uidTeacher);
  const validateTeacher = await validatePermissions({
    uidRol: existingUser.uidRol,
    per: permissions.teacher,
  });
  if (!validateTeacher)
    return res
      .status(409)
      .send({ errors: ['EL usuario no posee el rol de profesor'] });
  if (!existingTeacherById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'Profesor no encontrado' }] });
  existingTeacherById.uidTeacher = uidTeacher;
  existingTeacherById.uidCourse = uidCourse;
  await existingTeacherById.save();
  return res.status(201).send({ msg: 'Profesor actualizado con éxito' });
};
export default teacherUpdateController;
