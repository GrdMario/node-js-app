import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator =
    checkSchema({
        userId: {
            in: ['params'],
            errorMessage: 'Id is required',
            isInt: true
        },
        firstName: {
            in: ['body'],
            errorMessage: 'First name is required',
            isAlphanumeric: true
        },
        lastName: {
            in: ['body'],
            errorMessage: 'Last name is required',
            isAlphanumeric: true
        },
        username: {
            in: ['body'],
            errorMessage: 'User name is required',
            isAlphanumeric: true
        },
        email: {
            in: ['body'],
            errorMessage: 'Email is required',
            isEmail: true
        },
        isActive: {
            in: ['body'],
            errorMessage: 'Is Active is required',
            isBoolean: true
        }
    });

const handler = async (request: Request, response: Response) => {

    const repo = AppDataSource.getRepository(User);

    let user = await repo.findOneBy({ id: +request.params['userId'] });

    if (!user) {
        return response.status(404);
    }

    user = { ...user, ...request.body };

    await repo.save(user);

    response.status(204).send(user);
}

export const put = {
    validator,
    handler
}