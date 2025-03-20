import express, { Application } from 'express';
import 'dotenv/config';
import { appRoutes } from './globals/routes/appRoutes';

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

  private setupGlobalErrors() {}

  private listenServer() {
    const port = process.env.PORT || 3030;
    this.app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  }
}
