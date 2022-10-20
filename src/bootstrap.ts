import cors from '@fastify/cors';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { config as dotenvConfig } from 'dotenv';
import fastify from 'fastify';
import { contentParser as multerContentParser } from 'fastify-multer';
import mongoose from 'mongoose';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';
import { ImageRoutes } from './infrastructure/routes/image.routes';
import { UserRoutes } from './infrastructure/routes/user.routes';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUI, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

dotenvConfig();

export const bootstrap = async () => {
    const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

    app.register(cors);
    app.register(multerContentParser);

    const swaggerOptions: FastifyDynamicSwaggerOptions = {
        swagger: {
            info: { title: 'fastify-api', version: '0' },
            tags: [],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header',
                },
            },
        },
        mode: 'dynamic',
        stripBasePath: true,
    };

    const swaggerUioptions: FastifySwaggerUiOptions = {
        routePrefix: '/docs',
        uiConfig: {
            syntaxHighlight: {
                activate: true,
            },
        },
    };

    await app.register(fastifySwagger, swaggerOptions);

    await app.register(fastifySwaggerUI, swaggerUioptions);

    app.register(UserRoutes, { prefix: '/users' });
    app.register(ImageRoutes, { prefix: '/images' });

    app.setErrorHandler(errorMiddleware);

    try {
        // TODO: Tratar error de timeout
        await mongoose.connect(process.env.MONGODB_URI as string, {
            connectTimeoutMS: 10000,
        });
        console.log('Conexión con la BBDD realizada');
        console.log(
            'Listen to: ' +
                (await app.listen({ port: Number(process.env.PORT) || 3000 }))
        );
    } catch (err) {
        console.error(err);
    }
};
