import { QueryFile } from 'pg-promise';
import { join } from 'path';

export const createQuery = (dirname: string, filename: string) => {
  const fullPath = join(dirname, filename);

  const options = {
    minify: true,
  };

  const query = new QueryFile(fullPath, options);

  if (query.error) {
    console.error('Error creating query');
    throw query.error;
  }

  return query;
};
