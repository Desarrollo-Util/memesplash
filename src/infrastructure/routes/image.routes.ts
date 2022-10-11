import { Router } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';
import container from '../../container.js';
import { ImageFormats } from '../../domain/constants/image-formats.enum.js';
import { ContainerSymbols } from '../../symbols.js';
import { ImageFindAllController } from '../controllers/image-find-all.controller.js';
import { ImageFindByOwnerController } from '../controllers/image-find-by-owner.controller.js';
import { ImageUploadController } from '../controllers/image-upload.controller.js';
import { InvalidMimetypeFormatException } from '../errors/invalid-mimetype.exception';
import { authMiddleware } from '../middlewares/auth.middleware';
import { RequestWithFileProps } from '../types/request.types';

const IMAGE_PATH = resolve(__dirname, '../../../../images');

const storage = multer.diskStorage({
    destination: IMAGE_PATH,
    filename: function (req: RequestWithFileProps, file, cb) {
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
const router = Router();

const imageUploadController = container.get<ImageUploadController>(
    ContainerSymbols.ImageUploadController
);
const imageFindByOwnerController = container.get<ImageFindByOwnerController>(
    ContainerSymbols.ImageFindByOwnerController
);
const imageFindAllController = container.get<ImageFindAllController>(
    ContainerSymbols.ImageFindAllController
);

router.post(
    '/upload',
    authMiddleware,
    upload.single('image'),
    imageUploadController.execute.bind(imageUploadController)
);

router.get(
    '/my-images',
    authMiddleware,
    imageFindByOwnerController.execute.bind(imageFindByOwnerController)
);

router.get('/', imageFindAllController.execute.bind(imageFindAllController));

export const imageRoutes = router;
