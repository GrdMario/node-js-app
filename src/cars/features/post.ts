import express from 'express';

import { body } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

const validator =  [
    body('make').isAlphanumeric(),
    body('model').isAlphanumeric(),
    body('weight').isNumeric(),
    body('color').isAlphanumeric(),
];

const handler = async (request: express.Request, response: express.Response) => {

    const car : Car = {...request.body};

    await AppDataSource.getRepository(Car).save(car)

    response.status(204).send(car);
}

export const post = {
    validator,
    handler
}