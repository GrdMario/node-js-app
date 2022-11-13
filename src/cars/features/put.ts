import { Request, Response } from 'express';

import { body, param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

const validator = [
    param('carId').isAlphanumeric(),
    body('make').isAlphanumeric(),
    body('model').isAlphanumeric(),
    body('weight').isNumeric(),
    body('color').isAlphanumeric(),
];

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

export const put = {
    validator,
    handler
}