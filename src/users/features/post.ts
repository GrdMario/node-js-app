import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { User } from '../db/user';

const validator = checkSchema({
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

    const user: User = { ...request.body };

    await AppDataSource.getRepository(User).save(user);

    response.status(204).send(user);
}

export const post = [
    validator,
    validationHandler,
    handler
]