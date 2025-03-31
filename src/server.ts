import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { appRoutes } from './globals/routes/appRoutes';
import { StatusCodes } from 'http-status-codes';
import { CustomError, NotFoundException } from './globals/cores/error.core';
import cookieParser from 'cookie-parser';

export default class Server {
  app: Application;
  constructor() {
    this.app = express();
  }

  public start() {
    this.middlewares();
    this.setupRoutes();
    this.setupGlobalErrors();
    this.listenServer();
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  private setupRoutes() {
    appRoutes(this.app);
  }

  private setupGlobalErrors() {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(
        new NotFoundException(
          `The Url ${req.originalUrl} not found with method ${req.method}`,
        ),
      );
    });
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({
            message: error.message,
          });
        } else {
          res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
        }
      },
    );
  }

  private listenServer() {
    const port = process.env.PORT || 3030;
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
