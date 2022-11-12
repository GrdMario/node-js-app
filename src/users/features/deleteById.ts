import express from 'express';
import { param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

const validator =  [
    param('userId').isAlphanumeric(),
];

const handler = async (request: express.Request, response: express.Response) => {

    const result = await AppDataSource.getRepository(User).delete({id: +request.params['userId']})

    response.status(204).send(result);
}

export const deleteById = {
    validator,
    handler
}