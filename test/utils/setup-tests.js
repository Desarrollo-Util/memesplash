import { config as dontEnvConfig } from 'dotenv';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import startApp from '../../src/app.js';
import connectDb from '../../src/connect-db.js';

export const setupTests = (test) => {
    dontEnvConfig();

    let mongo, app;

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
        await startApp();
    });

    test.after.always(async () => {
        if (mongo) await mongo.stop(true);
    });
};
