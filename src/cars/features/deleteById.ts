import { Request, Response } from 'express';
import { checkSchema, param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

const validator = checkSchema({
    carId: {
        in: 'params',
        errorMessage: 'User id is required.',
        isInt: true
    }
});

const handler = async (request: Request, response: Response) => {

    const result = await AppDataSource.getRepository(Car).delete({ id: +request.params['carId'] })

    response.status(204).send(result);
}

export const deleteById = {
    validator,
    handler
}