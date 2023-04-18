import { type Request } from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/httpMessages';
import { db, queries } from '../db';
import { type Result } from '../types';

class MeetupService {
  async getOne(id: string): Promise<Result> {
    try {
      const result = await db.one(queries.getOne, [id]);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async getAll(): Promise<Result> {
    try {
      const result = await db.many(queries.getAll);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async delete(id: string): Promise<Result> {
    try {
      const result = await db.one(queries.delete, [id]);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async update(params: string[]): Promise<Result> {
    try {
      const result = await db.one(queries.update, params);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, status: 404, err: true };
    }
  }

  async create(params: string[]) {
    try {
      const result = await db.one(queries.create, params);

      return { result, status: 201 };
    } catch (err) {
      return { status: 500, error: true, result: INTERNAL_SERVER_ERROR };
    }
  }

  async getAllWithCustomQuery(query: string): Promise<Result> {
    try {
      const result = await db.many(query);

      return { result, status: 200 };
    } catch (err) {
      return { status: 404, err: true, result: NOT_FOUND };
    }
  }
}

export const meetupService = new MeetupService();
