import { FastifyReply, FastifyRequest } from 'fastify';
import { imageSize } from 'image-size';
import { inject, injectable } from 'inversify';
import { promisify } from 'util';
import { ImageUploadUseCase } from '../../application/use-cases/image-upload.usecase';
import { ImageFormats } from '../../domain/constants/image-formats.enum';
import { ContainerSymbols } from '../../symbols';
import { ImageUploadDtoType } from '../dtos/image-upload.dto';

const sizeOf = promisify(imageSize);

@injectable()
export class ImageUploadController {
    constructor(
        @inject(ContainerSymbols.ImageUploadUseCase)
        private imageUploadUseCase: ImageUploadUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: ImageUploadDtoType }>,
        res: FastifyReply
    ) {
        const { file, title, slug } = req;
        const { userId } = res;
        const { id } = req.body;

        if (!file) throw new Error();

        const dimensions = await sizeOf(file.path);

        if (!dimensions) throw new Error();

        await this.imageUploadUseCase.execute(
            id,
            userId,
            title,
            slug,
            file.mimetype as ImageFormats,
            file.size,
            dimensions.height || 0,
            dimensions.width || 0
        );

        return res.code(201).send();
    }
}
