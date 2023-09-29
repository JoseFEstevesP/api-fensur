import { Course } from '#Schemas/course.schema.js';

const courseUpdateController = async (req, res) => {
  const { uid, name, description, startDate, endDate, uidCreator } = req.body;
  const existingCourseById = await Course.findByPk(uid);
  if (!existingCourseById)
    return res.status(404).send({ errors: [{ uid: 'Curso no encontrado' }] });
  existingCourseById.name = name;
  existingCourseById.description = description;
  existingCourseById.startDate = startDate;
  existingCourseById.endDate = endDate;
  existingCourseById.uidCreator = uidCreator;
  await existingCourseById.save();
  return res.status(201).send({ msg: 'Curso actualizado con éxito' });
};
export default courseUpdateController;
