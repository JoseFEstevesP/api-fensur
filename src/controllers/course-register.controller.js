import { Course } from '#Schemas/course.schema.js';

const courseRegisterController = async (req, res) => {
  const { uid, name, description, startDate, endDate, uidCreator } = req.body;
  const existingCourseById = await Course.findByPk(uid);
  if (existingCourseById)
    return res
      .status(409)
      .send({ errors: [{ uid: 'Ya existe un rol con ese id registrado' }] });

  const course = await Course.create({
    uid,
    name,
    description,
    startDate,
    endDate,
    uidCreator,
  });
  await course.save();
  return res.status(201).send({ msg: 'Curso registrado con éxito' });
};
export default courseRegisterController;
