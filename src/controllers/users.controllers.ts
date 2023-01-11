import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import { instanceToPlain } from "class-transformer";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import AppError from "../errors/appError";

const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const createdUser = await createUserService(user);
  return res.status(201).json(instanceToPlain(createdUser));
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.status(200).json(instanceToPlain(users));
};

const updateUserController = async (req: Request, res: Response) => {
  const keys = Object.keys(req.body);
  if (
    keys.includes("id") ||
    keys.includes("isAdm") ||
    keys.includes("isActive")
  ) {
    throw new AppError("Some fields can't be updated!", 401);
  }

  const data: IUserUpdate = req.body;
  const { id } = req.params;
  const updatedUser = await updateUserService(data, id);
  return res.status(200).json(instanceToPlain(updatedUser));
};

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteResponse = await deleteUserService(id);
  if (Array.isArray(deleteResponse)) {
    return res.status(deleteResponse[1] as number).json({
      message: deleteResponse[0],
    });
  }
  return res.status(204).send();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
