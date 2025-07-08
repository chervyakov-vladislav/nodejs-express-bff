import { NextFunction, Request, Response } from "express";

export const hasValidId = (req: Request, res: Response, next: NextFunction) => {
  if (Number.isNaN(Number(req.params.id))) {
    res.status(400).json({ message: "Bad request" });

    return;
  }

  next();
};
