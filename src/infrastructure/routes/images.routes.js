import { Router } from 'express';
import multer from 'multer';
import { extname, resolve } from 'path';
import { fileURLToPath } from 'url';
import container from '../../container.js';
import { IMAGE_FORMATS } from '../../domain/constants/image-format.constant.js';
import { InvalidMimetypeFormatException } from '../errors/invalid-mimetype.exception.js';

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

        req.createdAt = createdAt;
        req.slug = `images/${filename}`;
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

router.post(
    '/upload',
    upload.single('image'),
    imageUploadController.execute.bind(imageUploadController)
);

export const imageRoutes = router;
