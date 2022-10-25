import cors from '@fastify/cors';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { contentParser as multerContentParser } from 'fastify-multer';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';
import { ImageRoutes } from './infrastructure/routes/image.routes';
import { UserRoutes } from './infrastructure/routes/user.routes';

const startApp = async () => {
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

    await app.register(fastifySwaggerUi, swaggerUioptions);

    app.register(UserRoutes, { prefix: '/users' });
    app.register(ImageRoutes, { prefix: '/images' });

    app.setErrorHandler(errorMiddleware);

    return app;
};

export default startApp;
