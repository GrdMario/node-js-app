import { Request, Response } from 'express';

import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { Car } from '../db/car';

const validator = checkSchema({
    make: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'Make is required.',
        }
    },
    model: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'Model is required',
        }
    },
    weight: {
        in: ['body'],
        isNumeric: {
            errorMessage: 'User name is required',
        }
    },
    color: {
        in: ['body'],
        isAlphanumeric: {
            errorMessage: 'Color is required',
        }
    }
});

const handler = async (request: Request, response: Response) => {

    const car: Car = { ...request.body };

    await AppDataSource.getRepository(Car).save(car)

    response.status(204).send(car);
}

export const post = [
    validator,
    validationHandler,
    handler
];