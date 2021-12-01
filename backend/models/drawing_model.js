import dotenv from 'dotenv';
dotenv.config();
import toPool from 'pg';

let Pool = toPool.Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});

