import { CommonRoutesConfig } from "../common/common.routes.config";
import { Application } from 'express';
import { post } from "./features/post";
import { put } from "./features/put";
import { deleteById } from "./features/deleteById";
import { get } from "./features/get";
import { getById } from "./features/getById";

export class CarsRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app);
    }

    configure(): Application {

        this.app.route(`/cars`)
            .get(...get)
            .post(...post);

        this.app.route(`/cars/:carId`)
            .get(...getById)
            .put(...put)
            .delete(...deleteById);

        return this.app;
    }
}
