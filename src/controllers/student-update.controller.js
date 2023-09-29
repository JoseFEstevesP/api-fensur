import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';
import { Student } from '#Schemas/student.schema.js';
import { User } from '#Schemas/user.schema.js';

const studentUpdateController = async (req, res) => {
  const { uid, uidStudent, uidCourse } = req.body;
  const existingStudentById = await Student.findByPk(uid);
  const existingUser = await User.findByPk(uidStudent);
  const validateStudent = await validatePermissions({
    uidRol: existingUser.uidRol,
    per: permissions.student,
  });
  if (!validateStudent)
    return res
      .status(409)
      .send({ errors: ['EL usuario no posee el rol de estudiante'] });
  if (!existingStudentById)
    return res
      .status(404)
      .send({ errors: [{ uid: 'Estudiante no encontrado' }] });
  existingStudentById.uidStudent = uidStudent;
  existingStudentById.uidCourse = uidCourse;
  await existingStudentById.save();
  return res.status(201).send({ msg: 'Estudiante actualizado con éxito' });
};
export default studentUpdateController;
