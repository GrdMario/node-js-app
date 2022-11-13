import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { User } from '../db/user';

const validator =
    checkSchema({
        userId: {
            in: ['params'],
            isInt: {
                errorMessage: 'Id is required',
            }
        },
        firstName: {
            in: ['body'],
            isAlphanumeric: {
                errorMessage: 'First name is required',
            }
        },
        lastName: {
            in: ['body'],
            isAlphanumeric: {
                errorMessage: 'Last name is required',
            }
        },
        username: {
            in: ['body'],
            isAlphanumeric: {
                errorMessage: 'User name is required',
            }
        },
        email: {
            in: ['body'],
            isEmail: {
                errorMessage: 'Email is required',
            }
        },
        isActive: {
            in: ['body'],
            isBoolean: {
                errorMessage: 'Is Active is required',
            }
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

export const put = [
    validator,
    validationHandler,
    handler
]