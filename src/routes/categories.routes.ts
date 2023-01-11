import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryPropertiesController,
} from "../controllers/categories.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRouter = Router();

categoriesRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);

categoriesRouter.get("", listCategoriesController);

categoriesRouter.get("/:id/properties", listCategoryPropertiesController);

export default categoriesRouter;
