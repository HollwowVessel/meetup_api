export interface IMeetup {
  name: string;
  description?: string;
  tags?: string[];
  timestamp: string;
}

export interface IQuery {
  name: string;
  description: string;
  tags: string[];
  to: string;
  from: string;
  sort: 'id' | 'name' | 'timestamp';
}
