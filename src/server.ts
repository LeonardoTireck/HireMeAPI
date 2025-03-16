import express, { Application } from "express";

export default class Server {
    app: Application;
    constructor() {
        this.app = express();
    }

    listenServer() {
        const port = 3000;
        this.app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    }
}