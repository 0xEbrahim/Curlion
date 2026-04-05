import { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";
import { fromError } from "zod-validation-error";

import { HttpStatus } from "../constants/index.js";

function parse<T>(
  schema: ZodSchema<T>,
  vData: unknown,
  res: Response,
): T | undefined {
  const result = schema.safeParse(vData);
  if (!result.success) {
    const error: ZodError = result.error;
    const validationError = fromError(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      status: "error",
      message: "Validation failed",
      errors: validationError.toString(),
    });
    return undefined;
  }
  return result.data;
}

export default <B, R, Q, P>(schema: {
  body?: ZodSchema<B>;
  response?: ZodSchema<R>;
  query?: ZodSchema<Q>;
  params?: ZodSchema<P>;
}) => {
  return (req: Request<P, R, B, Q>, res: Response, next: NextFunction) => {
    Object.defineProperty(req, "params", {
      value: req.params,
      writable: true,
    });
    Object.defineProperty(req, "query", {
      value: req.query,
      writable: true,
    });
    Object.defineProperty(req, "body", {
      value: req.body,
      writable: true,
    });

    if (schema.params) {
      const validatedParams = parse(schema.params, req.params, res);
      if (validatedParams === undefined) {
        return;
      }
      req.params = validatedParams;
    }

    if (schema.query) {
      const validatedQuery = parse(schema.query, req.query, res);
      if (validatedQuery === undefined) {
        return;
      }
      req.query = validatedQuery;
    }

    if (schema.body) {
      const validatedBody = parse(schema.body, req.body, res);
      if (validatedBody === undefined) {
        return;
      }
      req.body = validatedBody;
    }

    next();
  };
};
