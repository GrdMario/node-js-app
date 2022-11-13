import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

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

    let where: FindOptionsWhere<Car> = {};

    if (request.query['make']) {
        where = { ...where, make: Like(`${request.query['make']}%`) }
    }

    if (request.query['model']) {
        where = { ...where, model: Like(`${request.query['model']}%`) }
    }

    if (request.query['color']) {
        where = { ...where, color: Like(`${request.query['color']}%`) }
    }

    let cars = await AppDataSource.getRepository(Car).find({
        where: where,
        skip: +request.query['skip'],
        take: +request.query['take']
    });

    response.status(200).send(cars);
}

export const get = [
    validator,
    validationHandler,
    handler
];