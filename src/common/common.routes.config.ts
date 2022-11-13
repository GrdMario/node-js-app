import { Application } from 'express';

export abstract class CommonRoutesConfig {
    app: Application;

    constructor(app: Application) {
        this.app = app;
        this.configure();
    }

    abstract configure(): Application;
}