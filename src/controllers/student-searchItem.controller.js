import { Student } from '#Schemas/student.schema.js';

const studentSearchItemController = async (req, res) => {
  const { uid } = req.params;
  const student = await Student.findByPk(uid);
  if (!student)
    return res
      .status(404)
      .send({ errors: [{ uid: 'No se a encontrado ningún estudiante' }] });
  return res.status(200).send(student);
};

export default studentSearchItemController;
