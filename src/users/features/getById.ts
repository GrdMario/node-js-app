import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator = checkSchema({
    userId: {
        in: 'params',
        errorMessage: 'User id is required.',
        isInt: true
    }
})

const handler = async (request: Request, response: Response) => {

    let user = await AppDataSource.getRepository(User).findOneBy({ id: +request.params['userId'] });

    response.status(200).send(user);
}

export const getById = {
    validator,
    handler
}