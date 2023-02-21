import { Client } from "pg";
import 'dotenv/config'

const client: Client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT!),
    database: process.env.DB
});

export default client;
