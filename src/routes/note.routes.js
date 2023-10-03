import noteDeleteController from '#Controllers/note-delete.controller.js';
import noteReadController from '#Controllers/note-read.controller.js';
import noteRegisterController from '#Controllers/note-register.controller.js';
import noteSearchController from '#Controllers/note-search.controller.js';
import noteSearchItemController from '#Controllers/note-searchItem.controller.js';
import noteUpdateController from '#Controllers/note-update.controller.js';
import noteRegisterDTO from '#Dto/node-register.dto.js';
import deleteDTO from '#Dto/rol-delete.dto.js';
import createPermissions from '#Middleware/rol-create.middleware.js';
import deletePermissions from '#Middleware/rol-delete.middleware.js';
import readPermissions from '#Middleware/rol-read.middleware.js';
import teacherPermissions from '#Middleware/rol-teacher.middleware.js';
import updatePermissions from '#Middleware/rol-update.middleware.js';
import userJWTDTO from '#Middleware/user-jwt.middleware.js';
import { Router } from 'express';

const noteRoutes = Router();

noteRoutes.post(
  '/register',
  userJWTDTO,
  createPermissions,
  teacherPermissions,
  noteRegisterDTO,
  noteRegisterController
);
noteRoutes.get('/list', userJWTDTO, readPermissions, noteReadController);
noteRoutes.get(
  '/item/:uid',
  userJWTDTO,
  readPermissions,
  noteSearchItemController
);
noteRoutes.get('/search', userJWTDTO, readPermissions, noteSearchController);
noteRoutes.patch(
  '/update',
  userJWTDTO,
  updatePermissions,
  noteRegisterDTO,
  noteUpdateController
);
noteRoutes.delete(
  '/delete',
  userJWTDTO,
  deletePermissions,
  deleteDTO,
  noteDeleteController
);

export default noteRoutes;
