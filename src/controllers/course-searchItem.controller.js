import { Course } from '#Schemas/course.schema.js';

const courseSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const course = await Course.findByPk(uid);
  if (!course)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún curso' }] });
  return res.status(200).send(course);
};

export default courseSearchItemController;
