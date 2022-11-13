import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { User } from '../db/user';

const validator = checkSchema({
    userId: {
        in: 'params',
        errorMessage: 'User id is required.',
        isInt: true
    }
});

const handler = async (request: Request, response: Response) => {

    const result = await AppDataSource.getRepository(User).delete({ id: +request.params['userId'] })

    response.status(204).send(result);
}

export const deleteById = [
    validator,
    validationHandler,
    handler
]