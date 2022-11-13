import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { User } from '../db/user';

const validator = checkSchema({
    firstName: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'First name is requried'
        }
    },
    lastName: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'Last name is required'
        }
    },
    username: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'User name is required'
        }
    },
    email: {
        in: ['body'],
        isEmail: {
            errorMessage: 'Email is required'
        }
    },
    isActive: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Is Active is required'
        }
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