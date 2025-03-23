import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'joi';

function formatErrorMessage(errors: ValidationError) {
  return errors.details.map((error) => error.message);
}

export function verifySchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation Errors',
        error: formatErrorMessage(error),
      });
      return;
    }
    next();
  };
}
