import cors from '@fastify/cors';
import fastifyStaticPlugin from '@fastify/static';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { ImageUploadDto } from '@image/infrastructure/dtos/image-upload.dto';
import { ImageDto } from '@image/infrastructure/dtos/image.dto';
import { ImageRoutes } from '@image/infrastructure/routes/image.routes';
import { errorMiddleware } from '@shared/infrastructure/middlewares/error.middleware';
import {
    registerDtos
} from '@shared/infrastructure/utils/typebox-decorators';
import { UserLoginDto } from '@user/infrastructure/dtos/user-login.dto';
import { UserRegisterDto } from '@user/infrastructure/dtos/user-register.dto';
import { UserTokenDto } from '@user/infrastructure/dtos/user-token.dto';
import { UserDto } from '@user/infrastructure/dtos/user.dto';
import { UserRoutes } from '@user/infrastructure/routes/user.routes';
import fastify from 'fastify';
import { contentParser as multerContentParser } from 'fastify-multer';
import { join } from 'path';

const startApp = async () => {
    const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

    app.register(cors);
    app.register(multerContentParser);
    app.register(fastifyStaticPlugin, {
        root: join(__dirname, '../','images'),
    })

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
