import { Request, Response, NextFunction } from 'express';

export interface Err extends Error {
  statusCode: number;
  status: string;
}
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
export const globalErrorHandling = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'err';
  console.log(err);
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
