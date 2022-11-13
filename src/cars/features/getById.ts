import { Request, Response } from 'express';
import { param } from 'express-validator';
import { AppDataSource } from '../../common/database/context';
import { Car } from '../db/car';

const validator = [
    param('carId').isAlphanumeric()
];

const handler = async (request: Request, response: Response) => {

    let car = await AppDataSource.getRepository(Car).findOneBy({ id: +request.params['carId'] });

    response.status(200).send(car);
}

export const getById = {
    validator,
    handler
}