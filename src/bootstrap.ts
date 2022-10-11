import cors from '@fastify/cors';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import mongoose from 'mongoose';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';
import { imageRoutes } from './infrastructure/routes/image.routes';
import { userRoutes } from './infrastructure/routes/user.routes';

dotenvConfig();

export const bootstrap = async () => {
    const app = fastify();

    app.register(cors);

    app.register(userRoutes, { prefix: '/users' });
    app.register(imageRoutes, { prefix: '/images' });

    app.setErrorHandler(errorMiddleware);

    // TODO: Tratar error de timeout
    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            connectTimeoutMS: 10000,
        });
    } catch (err) {
        console.error('Se ha producido un error al conectar con la BBDD', err);
    }

    console.log('Conexión con la BBDD realizada');

    app.listen({ port: Number(process.env.PORT) || 3000 }, () =>
        console.log(`Servidor levantado en el puerto ${process.env.PORT}`)
    );
};
