import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

const validator = checkSchema({
    make: {
        in: ['body'],
        errorMessage: 'Make is required.',
        isAlphanumeric: true
    },
    model: {
        in: ['body'],
        errorMessage: 'Model is required',
        isAlphanumeric: true
    },
    weight: {
        in: ['body'],
        errorMessage: 'User name is required',
        isNumeric: true
    },
    email: {
        in: ['body'],
        errorMessage: 'Email is required',
        isEmail: true
    },
    color: {
        in: ['body'],
        errorMessage: 'Color is required',
        isAlphanumeric: true
    }
});

const handler = async (request: Request, response: Response) => {

    const car: Car = { ...request.body };

    await AppDataSource.getRepository(Car).save(car)

    response.status(204).send(car);
}

export const post = {
    validator,
    handler
}