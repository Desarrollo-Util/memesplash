import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import { extname, resolve } from 'path';
import { ImageFormats } from '../../domain/constants/image-formats.enum';
import { InvalidMimetypeFormatException } from '../errors/invalid-mimetype.exception';

const IMAGE_PATH = resolve(__dirname, '../../../../images');

const storage = multer.diskStorage({
    destination: IMAGE_PATH,
    filename: function (req: FastifyRequest, file, cb) {
        const createdAt = Date.now();
        const filename = createdAt + '-' + file.originalname;
        const extName = extname(IMAGE_PATH);

        req.slug = filename.replace(extName, '');

        cb(null, filename);
    },
});

export const multerImageUpload = multer({
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
