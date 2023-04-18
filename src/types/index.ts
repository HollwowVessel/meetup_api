import { type IMeetup } from '../schemes/meetup/interfaces';

export type Result = {
  result: IMeetup | IMeetup[] | string;
  status: number;
  err?: boolean;
};
