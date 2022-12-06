import { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import { File } from 'fastify-multer/lib/interfaces';
import { unlink } from 'fs/promises';
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
        file.slug = filename.replace(extName, '');
        file.destination = filename;
        file.path = resolve(IMAGE_PATH, filename);
        (req.body as any)[file.fieldname] = file;
        Object.defineProperty(req.body, file.fieldname, {
            get() {
                return req.file;
            },
        });
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

export const removeImageOnError = async (err: Error, req: FastifyRequest) => {
    const image: File = (req.body as any).image;
    await unlink(resolve(IMAGE_PATH, image.destination as string));
    throw err;
};
