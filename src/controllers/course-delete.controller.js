import { Course } from '#Schemas/course.schema.js';
const courseDeleteController = async (req, res) => {
  const { uid } = req.body;
  const existingCourseById = await Course.findByPk(uid);
  if (!existingCourseById)
    return res.status(401).send({ errors: [{ uid: 'Curso no encontrado' }] });
  await existingCourseById.destroy();
  return res.send({ msg: 'Curso eliminado' });
};
export default courseDeleteController;
