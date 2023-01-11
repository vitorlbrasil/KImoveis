import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controllers";

const sessionsRouter = Router();

sessionsRouter.post("", createSessionController);

export default sessionsRouter;
