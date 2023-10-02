import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';
import { Course } from '#Schemas/course.schema.js';
import { Student } from '#Schemas/student.schema.js';
import { User } from '#Schemas/user.schema.js';

const studentRegisterController = async (req, res) => {
  const { uid, uidStudent, uidCourse } = req.body;
  const existingStudentById = await Student.findByPk(uid);
  const existingUser = await User.findByPk(uidStudent);
  const existingCourse = await Course.findByPk(uidCourse);
  const validateTeacher = await validatePermissions({
    uidRol: existingUser.uidRol,
    per: permissions.student,
  });
  if (!validateTeacher)
    return res
      .status(409)
      .send({ errors: [{ uid: 'EL usuario no posee el rol de estudiante' }] });
  if (existingStudentById)
    return res.status(409).send({
      errors: [{ uid: 'Ya existe un estudiante con ese id registrado' }],
    });
  if (!existingUser)
    return res
      .status(409)
      .send({ errors: [{ uid: 'No existe un usuario con ese id' }] });
  if (!existingCourse)
    return res
      .status(409)
      .send({ errors: [{ uid: 'No existe un curso con ese id' }] });
  const student = await Student.create({
    uid,
    uidStudent,
    uidCourse,
  });
  await student.save();
  return res.status(201).send({ msg: 'Estudiante registrado con éxito' });
};
export default studentRegisterController;
