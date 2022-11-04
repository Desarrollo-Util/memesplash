import { Static, TOptional, TSchema } from '@sinclair/typebox';

export type ClassType<T> = {
    new (...args: any[]): T;
};
