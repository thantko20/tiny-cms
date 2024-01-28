import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import { Token } from "typedi";

export const httpLoggerMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    const durationInMs = end - start;

    logger.info(
      `url=${req.url} method=${req.method} statusCode=${res.statusCode} duration=${durationInMs}ms`
    );
  });
  next();
};

export const httpMiddlewareToken = new Token<typeof httpLoggerMiddleware>(
  "http-logger"
);
