import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { appRoutes } from './globals/routes/appRoutes';
import { StatusCodes } from 'http-status-codes';

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
  }

  private setupRoutes() {
    appRoutes(this.app);
  }

  private setupGlobalErrors() {
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      res.status(StatusCodes.NOT_FOUND).json({
        message: `The Url ${req.originalUrl} not found with method ${req.method}`,
      });
      next();
    });
  }

  private listenServer() {
    const port = process.env.PORT || 3030;
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
