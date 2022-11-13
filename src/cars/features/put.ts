import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { Car } from '../db/car';

const validator = checkSchema({
    carId: {
        in: ['body'],
        errorMessage: 'Car id is required.',
        isNumeric: true
    },
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

    const repo = AppDataSource.getRepository(Car);

    let car = await repo.findOneBy({ id: +request.params['carId'] });

    if (!car) {
        return response.status(404);
    }

    car = { ...car, ...request.body };

    await repo.save(car);

    response.status(204).send(car);
}

export const put = [
    validator,
    validationHandler,
    handler
];