import { authMiddleware } from '@shared/infrastructure/middlewares/auth.middleware';
import { registerRoute } from '@shared/infrastructure/utils/route';
import { getRef } from '@shared/infrastructure/utils/typebox-decorators';
import { FastifyInstance } from 'fastify';
import container from '../../../container';
import { ContainerSymbols } from '../../../symbols';
import { ImageFindAllController } from '../controllers/image-find-all.controller';
import { ImageFindByOwnerController } from '../controllers/image-find-by-owner.controller';
import { ImageUploadController } from '../controllers/image-upload.controller';
import { ImageUploadDto } from '../dtos/image-upload.dto';
import { ImageDto } from '../dtos/image.dto';
import { multerImageUpload, removeImageOnError } from '../utils/multer';

const imageUploadController = container.get<ImageUploadController>(
    ContainerSymbols.ImageUploadController
);
const imageFindByOwnerController = container.get<ImageFindByOwnerController>(
    ContainerSymbols.ImageFindByOwnerController
);
const imageFindAllController = container.get<ImageFindAllController>(
    ContainerSymbols.ImageFindAllController
);

export const ImageRoutes = (
    fastify: FastifyInstance,
    _options: any,
    done: (err?: Error) => void
) => {
    registerRoute(
        fastify,
        {
            method: 'POST',
            url: '/upload',
            schema: {
                tags: ['Image'],
                consumes: ['multipart/form-data'],
                security: [
                    {
                        Bearer: [''],
                    },
                ],
                body: getRef(ImageUploadDto),
                response: {
                    201: {
                        description: 'Empty response',
                        type: 'null',
                    },
                },
            },
            preValidation: [authMiddleware, multerImageUpload.single('image')],
            errorHandler: removeImageOnError,
        },
        imageUploadController.execute.bind(imageUploadController)
    );

    registerRoute(
        fastify,
        {
            method: 'GET',
            url: '/my-images',
            preValidation: authMiddleware,
            schema: {
                tags: ['Image'],
                security: [
                    {
                        Bearer: [''],
                    },
                ],
                response: {
                    200: getRef(ImageDto, true),
                },
            },
        },
        imageFindByOwnerController.execute.bind(imageFindByOwnerController)
    );

    registerRoute(
        fastify,
        {
            method: 'GET',
            url: '/',
            schema: {
                tags: ['Image'],
                response: {
                    200: getRef(ImageDto, true),
                },
            },
        },
        imageFindAllController.execute.bind(imageFindAllController)
    );

    done();
};
