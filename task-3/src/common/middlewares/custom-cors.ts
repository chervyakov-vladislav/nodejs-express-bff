import { NextFunction, Request, Response } from "express";

const allowedOrigins = ["https://www.example.com", "http://localhost:3000"];

export const customCors = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  next();
};
