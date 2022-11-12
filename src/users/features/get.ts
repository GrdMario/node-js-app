import express from 'express';
import { query } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

import { FindOptionsWhere, Like } from 'typeorm';

const validator = [
    query('skip')
        .isNumeric()
        .withMessage('Skip must be a number.')
        .notEmpty()
        .withMessage('Skip is required.'),
    query('take')
        .isNumeric()
        .withMessage('Take must be a number.')
        .notEmpty()
        .withMessage('Take is required.'),
];

const handler = async (request: express.Request, response: express.Response) => {


    throw new Error('Error')

    let where: FindOptionsWhere<User> = { };

    if (request.query['isActive']) {
        where = { ...where, isActive: request.query['isActive'] === 'true'}
    }

    if (request.query['firstName']) {
        where = { ...where, firstName: Like(`${request.query['firstName']}%`)}
    }

    if (request.query['lastName']) {
        where = { ...where, lastName: Like(`${request.query['lastName']}%`)}
    }

    if (request.query['email']) {
        where = { ...where, email: Like(`${request.query['email']}%`)}
    }

    let users = await AppDataSource.getRepository(User).find({
        where: where,
        skip: +request.query['skip'],
        take: +request.query['take']
    });

    response.status(200).send(users);
}

export const get = {
    validator,
    handler
}