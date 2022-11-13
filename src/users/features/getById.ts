import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { User } from '../db/user';

const validator = checkSchema({
    userId: {
        in: 'params',
        isInt: {
            errorMessage: 'User id must be a number.'
        }
    }
})

const handler = async (request: Request, response: Response) => {

    let user = await AppDataSource.getRepository(User).findOneBy({ id: +request.params['userId'] });

    response.status(200).send(user);
}

export const getById = [
    validator,
    validationHandler,
    handler
]