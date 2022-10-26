import { FastifyInstance } from 'fastify';
import container from '../../container';
import { ContainerSymbols } from '../../symbols';
import { ImageFindAllController } from '../controllers/image-find-all.controller';
import { ImageFindByOwnerController } from '../controllers/image-find-by-owner.controller';
import { ImageUploadController } from '../controllers/image-upload.controller';
import { ImageUploadDto } from '../dtos/image-upload.dto';
import { ImageDto } from '../dtos/image.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
import { multerImageUpload } from '../utils/multer';
import { registerRoute } from '../utils/route';
import { getArraySchema, getSchema } from '../utils/typebox-decorators';

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
                body: getSchema(ImageUploadDto),
                response: {
                    201: {
                        description: 'Empty response',
                        type: 'null',
                    },
                },
            },
            preValidation: [authMiddleware, multerImageUpload.single('image')],
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
                security: [
                    {
                        Bearer: [''],
                    },
                ],
                response: {
                    200: getArraySchema(ImageDto),
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
                response: {
                    200: getArraySchema(ImageDto),
                },
            },
        },
        imageFindAllController.execute.bind(imageFindAllController)
    );

    done();
};
