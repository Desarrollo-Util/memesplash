import { config as dotenvConfig } from 'dotenv';
import startApp from './app';
import connectDb from './connect-db';

dotenvConfig();

export const bootstrap = async () => {
    const app = await startApp();

    try {
        await connectDb();

        console.log('Conexión con la BBDD realizada');
        console.log(
            'Listen to: ' +
                (await app.listen({ port: Number(process.env.PORT) || 3000 }))
        );
    } catch (err) {
        console.error(err);
    }
};
