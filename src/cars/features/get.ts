import express from 'express';
import { query } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

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

    let where: FindOptionsWhere<Car> = { };

    if (request.query['make']) {
        where = { ...where, make: Like(`${request.query['make']}%`)}
    }

    if (request.query['model']) {
        where = { ...where, model: Like(`${request.query['model']}%`)}
    }

    if (request.query['color']) {
        where = { ...where, color: Like(`${request.query['color']}%`)}
    }

    let cars = await AppDataSource.getRepository(Car).find({
        where: where,
        skip: +request.query['skip'],
        take: +request.query['take']
    });

    response.status(200).send(cars);
}

export const get = {
    validator,
    handler
}