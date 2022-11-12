import express from 'express';

import { validationResult } from 'express-validator';

export const validationHandler = (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }

    next();
}

