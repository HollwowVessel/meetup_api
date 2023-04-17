import { QueryFile } from 'pg-promise';

export const createQuery = (filename: string) => new QueryFile(filename);
