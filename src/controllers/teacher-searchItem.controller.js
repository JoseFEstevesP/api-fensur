import { Teacher } from '#Schemas/teacher.schema.js';

const teacherSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const teacher = await Teacher.findByPk(uid);
  if (!teacher)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún profesor' }] });
  return res.status(200).send(teacher);
};

export default teacherSearchItemController;
