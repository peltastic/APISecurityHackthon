import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
const validateSchema =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      return res.status(400).json({
        status: false,
        message: e.errors[0].message,
      });
    }
  };

export default validateSchema;
