import studentDeleteController from '#Controllers/student-delete.controller.js';
import studentReadController from '#Controllers/student-read.controller.js';
import studentRegisterController from '#Controllers/student-register.controller.js';
import studentSearchController from '#Controllers/student-search.controller.js';
import studentSearchItemController from '#Controllers/student-searchItem.controller.js';
import studentUpdateController from '#Controllers/student-update.controller.js';
import deleteDTO from '#Dto/rol-delete.dto.js';
import studentRegisterDTO from '#Dto/student-register.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const studentRoutes = Router();

studentRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  studentRegisterDTO,
  studentRegisterController
);
studentRoutes.get('/list', userJWTDTO, readPermissions, studentReadController);
studentRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  studentSearchItemController
);
studentRoutes.get(
  '/search',
  userJWTDTO,
  readPermissions,
  studentSearchController
);
studentRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  studentRegisterDTO,
  studentUpdateController
);
studentRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  studentDeleteController
);

export default studentRoutes;
