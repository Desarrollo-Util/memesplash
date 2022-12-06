import cors from '@fastify/cors';
import fastifyStaticPlugin from '@fastify/static';
import fastifySwagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import fastifySwaggerUi, { FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import { ImageUploadDto } from '@image/infrastructure/dtos/image-upload.dto';
import { ImageDto } from '@image/infrastructure/dtos/image.dto';
import { ImageRoutes } from '@image/infrastructure/routes/image.routes';
import { errorMiddleware } from '@shared/infrastructure/middlewares/error.middleware';
import { registerDtos } from '@shared/infrastructure/utils/typebox-decorators';
import { UserLoginDto } from '@user/infrastructure/dtos/user-login.dto';
import { UserRegisterDto } from '@user/infrastructure/dtos/user-register.dto';
import { UserTokenDto } from '@user/infrastructure/dtos/user-token.dto';
import { UserDto } from '@user/infrastructure/dtos/user.dto';
import { UserRoutes } from '@user/infrastructure/routes/user.routes';
import fastify from 'fastify';
import { contentParser as multerContentParser } from 'fastify-multer';
import { join } from 'path';

const startApp = async () => {
    const app = fastify({
        ajv: {
            customOptions: {
                keywords: ['isFile'],
            },
        },
    });

    app.register(cors);
    app.register(multerContentParser);
    app.register(fastifyStaticPlugin, {
        root: join(__dirname, '../', 'images'),
    });

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
            info: { title: 'Memesplash-api', version: '1' },
            tags: [
                {
                    name: 'User',
                },
                {
                    name: 'Image',
                },
            ],
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
        transform({ schema, url }) {
            if (
                !(schema?.body as any)?.$ref ||
                !(schema.consumes || []).includes('multipart/form-data')
            )
                return { schema, url } as any;

            const newSchema: any = app.getSchema((schema.body as any).$ref);
            if (!newSchema.properties)
                return {
                    schema,
                    url,
                } as any;
            Object.keys(newSchema.properties).forEach((propName) => {
                if (
                    newSchema.properties[propName] &&
                    newSchema.properties[propName].isFile
                ) {
                    newSchema.properties[propName].type = 'file';
                    newSchema.properties[propName].properties = undefined;
                    newSchema.properties[propName].isFile = undefined;
                }
            });
            schema.body = newSchema;
            return {
                schema,
                url,
            };
        },
    };

    const swaggerUioptions: FastifySwaggerUiOptions = {
        routePrefix: '/docs',
        uiConfig: {
            syntaxHighlight: {
                activate: true,
                theme: 'monokai-vibrant',
            },
            persistAuthorization: true,
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
