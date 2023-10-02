import { Teacher } from '#Schemas/teacher.schema.js';
const teacherDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingTeacherById = await Teacher.findByPk(uid);
  if (!existingTeacherById)
    return res
      .status(401)
      .send({ errors: [{ uid: 'Profesor no encontrado' }] });
  await existingTeacherById.destroy();
  return res.send({ msg: 'Profesor eliminado' });
};
export default teacherDeleteController;
