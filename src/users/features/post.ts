import { Request, Response } from 'express';

import { body } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator = [
    body('firstName').isAlphanumeric(),
    body('lastName').isAlphanumeric(),
    body('username').isAlphanumeric(),
    body('email').isEmail(),
    body('isActive').isBoolean()
];

const handler = async (request: Request, response: Response) => {

    const user: User = { ...request.body };

    await AppDataSource.getRepository(User).save(user);

    response.status(204).send(user);
}

export const post = {
    validator,
    handler
}