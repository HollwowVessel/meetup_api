import { type IQuery } from '../schemes/meetup/interfaces';

export const generateQueryValues = (query: IQuery) => {
  const res = [];

  for (const item in query) {
    if (item in query) {
      res.push({ key: item, value: query[item as keyof IQuery] });
    }
  }

  return res
    .map(({ key, value }) => {
      if (key === 'tags') {
        if (typeof value === 'string') {
          return `'${value}' = ANY(${key})`;
        }

        if (typeof value === 'object') {
          return value.map((tag) => `'${tag}' = ANY(tags)`).join(' AND ');
        }
      }

      if (
        typeof value === 'string' &&
        !['from', 'to', 'page', 'offset'].includes(key)
      ) {
        return `${key} = '${value}'`;
      }

      return null;
    })
    .filter((el) => el !== null)
    .join(' AND ');
};
