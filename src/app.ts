require("express-async-errors");
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './common/handlers/error.handler';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { AppDataSource } from "./common/database/context";

import env from 'dotenv';
import { CarsRoutes } from './cars/cars.routes.config';

env.config();

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT;


// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());
app.use(morgan('tiny'));

// here we are adding middleware to allow cross-origin requests
app.use(cors());

const routes: Array<CommonRoutesConfig> = [];
routes.push(new UsersRoutes(app));
routes.push(new CarsRoutes(app));

app.use(errorHandler);

AppDataSource.initialize().then(s => console.log("Finished")).catch(err => console.log(err));


app.listen(port, () => console.log('listening on port: ' + port))


