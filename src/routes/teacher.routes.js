import teacherDeleteController from '#Controllers/teacher-delete.controller.js';
import teacherReadController from '#Controllers/teacher-read.controller.js';
import teacherRegisterController from '#Controllers/teacher-register.controller.js';
import teacherSearchController from '#Controllers/teacher-search.controller.js';
import teacherSearchItemController from '#Controllers/teacher-searchItem.controller.js';
import teacherUpdateController from '#Controllers/teacher-update.controller.js';
import deleteDTO from '#Dto/rol-delete.dto.js';
import teacherRegisterDTO from '#Dto/teacher-register.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const teacherRoutes = Router();

teacherRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  teacherRegisterDTO,
  teacherRegisterController
);
teacherRoutes.get('/list', userJWTDTO, readPermissions, teacherReadController);
teacherRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  teacherSearchItemController
);
teacherRoutes.get(
  '/search',
  userJWTDTO,
  readPermissions,
  teacherSearchController
);
teacherRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  teacherRegisterDTO,
  teacherUpdateController
);
teacherRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  teacherDeleteController
);

export default teacherRoutes;
