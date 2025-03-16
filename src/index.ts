import Server from './server';

export class JobApplication {
  run() {
    const server = new Server();
    server.listenServer();
  }
}

const job = new JobApplication();
job.run();
