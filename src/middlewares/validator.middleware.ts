import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate = (
  opts: Partial<Record<"body" | "query" | "params", ZodSchema>>
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    let key: keyof typeof opts;
    for (key in opts) {
      const schema = opts[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);

      if (!result.success) {
        console.log(result.error.flatten());
        return next(new Error());
      }

      req[key] = result.data;
    }

    next();
  };
};
