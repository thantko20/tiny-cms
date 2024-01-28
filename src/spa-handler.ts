import { NextFunction, Request, Response } from "express";
import path from "node:path";

export const spaHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filePath = path.join(__dirname, "react-client", "index.html");
    return res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
