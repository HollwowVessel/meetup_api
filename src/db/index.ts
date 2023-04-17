import pgPromise from 'pg-promise';
import { createQuery } from '../utils/createQuery';
import {
  POSTGRES_NAME as NAME,
  POSTGRES_PASSWORD as PASSWORD,
  POSTGRES_PORT as PORT,
  POSTGRES_USER as USER,
} from '../constants';
const pgp = pgPromise();

const connectionString = `postgresql://${USER!}:${PASSWORD!}@localhost:${PORT!}/${NAME!}`;

export const db = pgp(connectionString);

export const queries = {
  getAll: createQuery(__dirname, 'queries/getAll.sql'),
  getOne: createQuery(__dirname, 'queries/getById.sql'),
  delete: createQuery(__dirname, 'queries/delete.sql'),
  update: createQuery(__dirname, 'queries/update.sql'),
  create: createQuery(__dirname, 'queries/create.sql'),
};
