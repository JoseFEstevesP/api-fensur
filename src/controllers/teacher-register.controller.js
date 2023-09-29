import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';
import { Course } from '#Schemas/course.schema.js';
import { Teacher } from '#Schemas/teacher.schema.js';
import { User } from '#Schemas/user.schema.js';

const teacherRegisterController = async (req, res) => {
  const { uid, uidTeacher, uidCourse } = req.body;
  const existingTeacherById = await Teacher.findByPk(uid);
  const existingUser = await User.findByPk(uidTeacher);
  const existingCourse = await Course.findByPk(uidCourse);
  const validateTeacher = await validatePermissions({
    uidRol: existingUser.uidRol,
    per: permissions.teacher,
  });
  if (!validateTeacher)
    return res
      .status(409)
      .send({ errors: ['EL usuario no posee el rol de profesor'] });
  if (existingTeacherById)
    return res
      .status(409)
      .send({ errors: ['Ya existe un profesor con ese id registrado'] });
  if (!existingUser)
    return res
      .status(409)
      .send({ errors: ['No existe un usuario con ese id'] });
  if (!existingCourse)
    return res.status(409).send({ errors: ['No existe un curso con ese id'] });
  const teacher = await Teacher.create({
    uid,
    uidTeacher,
    uidCourse,
  });
  await teacher.save();
  return res.status(201).send({ msg: 'Profesor registrado con éxito' });
};
export default teacherRegisterController;
