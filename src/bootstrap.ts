import cors from '@fastify/cors';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import mongoose from 'mongoose';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';
import { ImageRoutes } from './infrastructure/routes/image.routes';
import { UserRoutes } from './infrastructure/routes/user.routes';

dotenvConfig();

export const bootstrap = async () => {
    const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

    app.register(cors);

    app.register(UserRoutes, { prefix: '/users' });
    app.register(ImageRoutes, { prefix: '/images' });

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
