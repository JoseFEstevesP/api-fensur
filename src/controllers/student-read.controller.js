import { Student } from '#Schemas/student.schema.js';

const studentReadController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { rows, count } = await Student.findAndCountAll({
    limit,
    page,
  });
  const pages = Math.ceil(count / limit);
  const totalPage = page > pages ? pages : page;
  const nextPage = Number(totalPage) + 1;
  const previousPage = Number(totalPage) - 1;
  return res.status(200).send({
    count,
    currentPage: Number(totalPage),
    nextPage: nextPage <= pages ? nextPage : null,
    previousPage: previousPage > 0 ? previousPage : null,
    limit: Number(limit),
    pages,
    rows,
  });
};

export default studentReadController;
