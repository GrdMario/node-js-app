import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { User } from '../db/user';

import { FindOptionsWhere, Like } from 'typeorm';
import { validationHandler } from '../../common/handlers/validation.handler';

const validator = checkSchema({
    skip: {
        in: ['query'],
        isNumeric: {
            errorMessage: 'Skip must be a number.',
        },
        notEmpty: {
            errorMessage: 'Skip is required.'
        }
    },
    take: {
        in: ['query'],
        isNumeric: {
            errorMessage: 'Take must be a number.',
        },
        notEmpty: {
            errorMessage: 'Take is required.'
        }
    },
});

const handler = async (request: Request, response: Response) => {

    let where: FindOptionsWhere<User> = {};

    if (request.query['isActive']) {
        where = { ...where, isActive: request.query['isActive'] === 'true' }
    }

    if (request.query['firstName']) {
        where = { ...where, firstName: Like(`${request.query['firstName']}%`) }
    }

    if (request.query['lastName']) {
        where = { ...where, lastName: Like(`${request.query['lastName']}%`) }
    }

    if (request.query['email']) {
        where = { ...where, email: Like(`${request.query['email']}%`) }
    }

    let users = await AppDataSource.getRepository(User).find({
        where: where,
        skip: +request.query['skip'],
        take: +request.query['take']
    });

    response.status(200).send(users);
}

export const get = [
    validator,
    validationHandler,
    handler
]