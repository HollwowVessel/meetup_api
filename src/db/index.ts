import pgPromise from 'pg-promise';
import { createQuery } from '../utils/createQuery';
import {
  POSTGRES_NAME as NAME,
  POSTGRES_PASSWORD as PASSWORD,
  POSTGRES_PORT as PORT,
  POSTGRES_USER as USER,
} from '../constants';
const pgp = pgPromise();

const connectionString = `postgres://${USER!}:${PASSWORD!}@postgres:${PORT!}`;

export const db = pgp(connectionString);

export const meetupQueries = {
  getAll: createQuery(__dirname, 'queries/meetup/getAll.sql'),
  getOne: createQuery(__dirname, 'queries/meetup/getById.sql'),
  delete: createQuery(__dirname, 'queries/meetup/delete.sql'),
  update: createQuery(__dirname, 'queries/meetup/update.sql'),
  create: createQuery(__dirname, 'queries/meetup/create.sql'),
};

export const userQueries = {
  getAll: createQuery(__dirname, 'queries/user/getAll.sql'),
  getById: createQuery(__dirname, 'queries/user/getById.sql'),
  getByEmail: createQuery(__dirname, 'queries/user/getByEmail.sql'),
  create: createQuery(__dirname, 'queries/user/create.sql'),
  updateToken: createQuery(__dirname, 'queries/user/updateToken.sql'),
};
