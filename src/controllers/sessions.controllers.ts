import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import createSessionService from "../services/sessions/createSession.service";

const createSessionController = async (req: Request, res: Response) => {
  try {
    const data: IUserLogin = req.body;
    const token = await createSessionService(data);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({
        error: error.name,
        message: error.message,
      });
    }
  }
};

export { createSessionController };
