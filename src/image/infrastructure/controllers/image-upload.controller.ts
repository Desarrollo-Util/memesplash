import { ImageFormats } from '@image/domain/constants/image-formats.enum';
import { ImageFormatVO } from '@image/domain/value-objects/image-format.vo';
import { IntGtZeroVO } from '@shared/domain/value-objects/int-gt-zero.vo';
import { TitleVO } from '@shared/domain/value-objects/title.vo';
import { UrlSlugVO } from '@shared/domain/value-objects/url-slug.vo';
import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { FastifyReply, FastifyRequest } from 'fastify';
import { imageSize } from 'image-size';
import { inject, injectable } from 'inversify';
import { promisify } from 'util';
import { ContainerSymbols } from '../../../symbols';
import { ImageUploadUseCase } from '../../application/use-cases/image-upload.usecase';
import { ImageUploadDto } from '../dtos/image-upload.dto';

const sizeOf = promisify(imageSize);

@injectable()
export class ImageUploadController {
    constructor(
        @inject(ContainerSymbols.ImageUploadUseCase)
        private imageUploadUseCase: ImageUploadUseCase
    ) {}

    async execute(
        req: FastifyRequest<{ Body: ImageUploadDto }>,
        res: FastifyReply
    ): Promise<void> {
        const { image, title, id } = req.body;

        if (!image) throw new Error();

        const dimensions = await sizeOf(image.path as string);

        if (!dimensions) throw new Error();
        console.log(image.size);

        await this.imageUploadUseCase.execute(
            new UuidVO(id),
            new UuidVO(res.userId),
            new TitleVO(title),
            new UrlSlugVO(image.slug),
            new ImageFormatVO(image.mimetype as ImageFormats),
            new IntGtZeroVO(image.size || 0),
            new IntGtZeroVO(dimensions.height || 0),
            new IntGtZeroVO(dimensions.width || 0)
        );

        res.statusCode = 201;
    }
}
