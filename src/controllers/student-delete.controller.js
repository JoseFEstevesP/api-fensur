import { Student } from '#Schemas/student.schema.js';
const studentDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingStudentById = await Student.findByPk(uid);
  if (!existingStudentById)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Estudiante no encontrado' }] });
  await existingStudentById.destroy();
  return res.send({ msg: 'Estudiante eliminado' });
};
export default studentDeleteController;
