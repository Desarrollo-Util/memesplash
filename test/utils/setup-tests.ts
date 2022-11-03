import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { TestFn } from 'ava';
import { config as dontEnvConfig } from 'dotenv';
import type { FastifyBaseLogger, FastifyInstance } from 'fastify';
import type { IncomingMessage, Server, ServerResponse } from 'http';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import 'reflect-metadata';
import startApp from '../../src/app';
import connectDb from '../../src/connect-db';

export let app: FastifyInstance<
    Server<typeof IncomingMessage, typeof ServerResponse>,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
>;

export const setupTests = (test: TestFn<unknown>) => {
    dontEnvConfig();

    let mongo: MongoMemoryReplSet;

    test.before(async () => {
        mongo = await MongoMemoryReplSet.create({
            replSet: {
                count: 1,
                dbName: 'memesplash',
            },
        });
        console.log('BBDD en memoria levantada');

        process.env.MONGODB_URI = mongo.getUri();
        await connectDb();
        app = await startApp();
    });

    test.after.always(async () => {
        if (mongo)
            await mongo.stop({
                doCleanup: true,
                force: true,
            });
    });
};
