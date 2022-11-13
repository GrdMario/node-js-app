import { Request, Response } from 'express';
import { checkSchema } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { validationHandler } from '../../common/handlers/validation.handler';
import { Car } from '../db/car';

const validator = checkSchema({
    carId: {
        in: 'params',
        isInt: {
            errorMessage: 'Car id is required.',
        }
    }
});

const handler = async (request: Request, response: Response) => {

    let car = await AppDataSource.getRepository(Car).findOneBy({ id: +request.params['carId'] });

    response.status(200).send(car);
}

export const getById = [
    validator,
    validationHandler,
    handler
]