import { Router } from "express";
import {
  createScheduleController,
  listPropertySchedulesController,
} from "../controllers/schedules.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post("", ensureAuthMiddleware, createScheduleController);

schedulesRouter.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listPropertySchedulesController
);

export default schedulesRouter;
