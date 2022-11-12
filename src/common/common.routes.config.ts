import express from 'express';

export abstract class CommonRoutesConfig {
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
        this.configure();
    }

    abstract configure(): express.Application;
}