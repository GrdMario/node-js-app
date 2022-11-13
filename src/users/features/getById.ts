import { Request, Response } from 'express';
import { param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator = [
    param('userId').isAlphanumeric()
];

const handler = async (request: Request, response: Response) => {

    let user = await AppDataSource.getRepository(User).findOneBy({ id: +request.params['userId'] });

    response.status(200).send(user);
}

export const getById = {
    validator,
    handler
}