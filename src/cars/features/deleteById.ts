import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { Car } from '../db/car';

const validator = checkSchema({
    carId: {
        in: 'params',
        isInt: {
            errorMessage: 'User id is required.',
        }
    }
});

const handler = async (request: Request, response: Response) => {

    const result = await AppDataSource.getRepository(Car).delete({ id: +request.params['carId'] })

    response.status(204).send(result);
};

export const deleteById = [
    validator,
    validationHandler,
    handler
];