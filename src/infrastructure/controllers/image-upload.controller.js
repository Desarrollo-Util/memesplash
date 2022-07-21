import { imageSize } from 'image-size';
import { promisify } from 'util';

const sizeOf = promisify(imageSize);

export class ImageUploadController {
    constructor({ imageUploadUseCase }) {
        this.imageUploadUseCase = imageUploadUseCase;
    }

    async execute(req, res, next) {
        const { file, title, slug } = req;
        const { id } = req.body;
        const dimensions = await sizeOf(file.path);

        if (!dimensions) throw new Error();

        try {
            await this.imageUploadUseCase.execute(
                id,
                title,
                slug,
                file.mimetype,
                file.size,
                dimensions.height,
                dimensions.width
            );

            return res.sendStatus(201);
        } catch (err) {
            next(err);
        }
    }
}
