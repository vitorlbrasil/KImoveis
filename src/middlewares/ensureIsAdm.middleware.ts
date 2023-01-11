import { NextFunction, Request, Response } from "express";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    return res.status(403).json({
      message: "User is not admin!",
    });
  }

  return next();
};

export default ensureIsAdmMiddleware;
