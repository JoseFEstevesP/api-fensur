import courseDeleteController from '#Controllers/course-delete.controller.js';
import courseReadController from '#Controllers/course-read.controller.js';
import courseRegisterController from '#Controllers/course-register.controller.js';
import courseSearchController from '#Controllers/course-search.controller.js';
import courseSearchItemController from '#Controllers/course-searchItem.controller.js';
import courseUpdateController from '#Controllers/course-update.controller.js';
import courseRegisterDTO from '#Dto/course-register.dto.js';
import deleteDTO from '#Dto/rol-delete.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const courseRoutes = Router();

courseRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  courseRegisterDTO,
  courseRegisterController
);
courseRoutes.get('/list', userJWTDTO, readPermissions, courseReadController);
courseRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  courseSearchItemController
);
courseRoutes.get(
  '/search',
  userJWTDTO,
  readPermissions,
  courseSearchController
);
courseRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  courseRegisterDTO,
  courseUpdateController
);
courseRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  courseDeleteController
);

export default courseRoutes;
