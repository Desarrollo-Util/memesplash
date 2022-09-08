import { config as dontEnvConfig } from 'dotenv';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { bootstrap } from '../../src/bootstrap.js';

export const setupTests = (test) => {
    dontEnvConfig();

    let mongo;

    test.before(async () => {
        mongo = await MongoMemoryReplSet.create({
            replSet: {
                count: 1,
                dbName: 'memesplash',
            },
        });
        console.log('BBDD en memoria levantada');

        process.env.MONGODB_URI = mongo.getUri();

        await bootstrap();
    });

    test.after.always(async () => {
        if (mongo) await mongo.stop(true);
    });
};
