import express from 'express';

import { body, param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator =  [
    param('userId').isAlphanumeric(),
    body('firstName').isAlphanumeric(),
    body('lastName').isAlphanumeric(),
    body('username').isAlphanumeric(),
    body('email').isEmail(),
    body('isActive').isBoolean()
];

const handler = async (request: express.Request, response: express.Response) => {

    const repo =  AppDataSource.getRepository(User);

    let user = await repo.findOneBy({ id : +request.params['userId']});

    if (!user) {
        return response.status(404);
    }

    user = {...user, ...request.body };

    await repo.save(user);

    response.status(204).send(user);
}

export const put = {
    validator,
    handler
}