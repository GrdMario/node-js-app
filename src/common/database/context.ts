
import { DataSource } from "typeorm";
import { User } from "../../users/db/user";
import env from 'dotenv';
import { Car } from "../../cars/db/car";
env.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Car],
    subscribers: [],
    migrations: [],
})