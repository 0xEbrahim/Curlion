import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler =
  <P = Record<string, string>, ResBody = unknown, ReqBody = unknown>(
    fn: (
      req: Request<P, ResBody, ReqBody>,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(
      fn(req as Request<P, ResBody, ReqBody>, res, next),
    ).catch(next);
  };
