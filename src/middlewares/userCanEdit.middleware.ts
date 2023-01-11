import { NextFunction, Request, Response } from "express";

const userCanEditMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  const tokenId = req.user.id;
  const { id } = req.params;

  if (isAdm) {
    return next();
  } else if (tokenId === id) {
    return next();
  } else {
    return res.status(401).json({
      message: "User not allowed!",
    });
  }
};

export default userCanEditMiddleware;
