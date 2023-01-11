import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import userCanEditMiddleware from "../middlewares/userCanEdit.middleware";

const usersRouter = Router();

usersRouter.post("", createUserController);
usersRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
usersRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  userCanEditMiddleware,
  updateUserController
);
usersRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

export default usersRouter;
