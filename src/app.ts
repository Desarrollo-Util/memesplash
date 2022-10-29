import cors from '@fastify/cors';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify';
import { contentParser as multerContentParser } from 'fastify-multer';
import { ImageUploadDto } from './infrastructure/dtos/image-upload.dto';
import { ImageDto } from './infrastructure/dtos/image.dto';
import { UserLoginDto } from './infrastructure/dtos/user-login.dto';
import { UserRegisterDto } from './infrastructure/dtos/user-register.dto';
import { UserTokenDto } from './infrastructure/dtos/user-token.dto';
import { UserDto } from './infrastructure/dtos/user.dto';
import { errorMiddleware } from './infrastructure/middlewares/error.middleware';
import { ImageRoutes } from './infrastructure/routes/image.routes';
import { UserRoutes } from './infrastructure/routes/user.routes';
import {
    getSchema,
    registerDtos,
} from './infrastructure/utils/typebox-decorators';

const startApp = async () => {
    const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

    app.register(cors);
    app.register(multerContentParser);

    registerDtos(
        app,
        ImageUploadDto,
        ImageDto,
        UserDto,
        UserLoginDto,
        UserTokenDto,
        UserRegisterDto
    );

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
                theme: 'monokai-vibrant',
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
