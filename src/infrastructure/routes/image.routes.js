import { Router } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import container from '../../container.js';
import { IMAGE_FORMATS } from '../../domain/constants/image-format.constant.js';
import { InvalidMimetypeFormatException } from '../errors/invalid-mimetype.exception.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const IMAGE_PATH = resolve(
    fileURLToPath(import.meta.url),
    '../../../../images'
);

const storage = multer.diskStorage({
    destination: IMAGE_PATH,
    filename: function (req, file, cb) {
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
        if (!Object.values(IMAGE_FORMATS).includes(file.mimetype))
            cb(new InvalidMimetypeFormatException());
        else cb(null, true);
    },
});
const router = Router();

const imageUploadController = container.resolve('imageUploadController');
const imageFindByOwnerController = container.resolve(
    'imageFindByOwnerController'
);
const imageFindAllController = container.resolve('imageFindAllController');

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
