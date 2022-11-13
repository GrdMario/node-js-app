import { CommonRoutesConfig } from "../common/common.routes.config";
import { Application } from 'express';
import { post } from "./features/post";
import { put } from "./features/put";
import { deleteById } from "./features/deleteById";
import { get } from "./features/get";
import { getById } from "./features/getById";

import { validationHandler } from "../common/handlers/validation.handler";

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Application) {
        super(app);
    }

    configure(): Application {

        this.app.route(`/users`)
            .get(get.validator, validationHandler, get.handler)
            .post(post.validator, validationHandler, post.handler);

        this.app.route(`/users/:userId`)
            .get(getById.validator, validationHandler, getById.handler)
            .put(put.validator, validationHandler, put.handler)
            .delete(deleteById.validator, validationHandler, deleteById.handler);

        return this.app;
    }
}
