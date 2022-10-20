import { FastifyInstance, FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import { extname, resolve } from 'path';
import container from '../../container';
import { ImageFormats } from '../../domain/constants/image-formats.enum';
import { ContainerSymbols } from '../../symbols';
import { ImageFindAllController } from '../controllers/image-find-all.controller';
import { ImageFindByOwnerController } from '../controllers/image-find-by-owner.controller';
import { ImageUploadController } from '../controllers/image-upload.controller';
import { ImageUploadDto, ImageUploadDtoType } from '../dtos/image-upload.dto';
import { InvalidMimetypeFormatException } from '../errors/invalid-mimetype.exception';
import { authMiddleware } from '../middlewares/auth.middleware';

const IMAGE_PATH = resolve(__dirname, '../../../../images');

const storage = multer.diskStorage({
    destination: IMAGE_PATH,
    filename: function (req: FastifyRequest, file, cb) {
        const createdAt = Date.now();
        const filename = createdAt + '-' + file.originalname;
        const extName = extname(IMAGE_PATH);

        req.slug = 'images';
        req.title = filename.replace(extName, '');

        cb(null, filename);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (_, file, cb) => {
        if (
            !Object.values(ImageFormats).includes(file.mimetype as ImageFormats)
        )
            cb(new InvalidMimetypeFormatException());
        else cb(null, true);
    },
});

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
    done: () => void
) => {
    fastify.route<{ Body: ImageUploadDtoType }>({
        method: 'POST',
        url: '/upload',
        schema: {
            body: ImageUploadDto,
        },
        preHandler: [authMiddleware, upload.single('image')],
        handler: imageUploadController.execute.bind(imageUploadController),
    });

    fastify.route({
        method: 'GET',
        url: '/my-images',
        preHandler: authMiddleware,
        handler: imageFindByOwnerController.execute.bind(
            imageFindByOwnerController
        ),
    });

    fastify.route({
        method: 'GET',
        url: '/',
        handler: imageFindAllController.execute.bind(imageFindAllController),
    });
    done();
};
