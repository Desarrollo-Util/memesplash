import { FastifyReply, FastifyRequest } from 'fastify';
import { imageSize } from 'image-size';
import { inject, injectable } from 'inversify';
import { promisify } from 'util';
import { ImageUploadUseCase } from '../../application/use-cases/image-upload.usecase';
import { ImageFormatVO } from '../../domain/value-objects/image-format.vo';
import { IntGtZeroVO } from '../../domain/value-objects/int-gt-zero.vo';
import { TitleVO } from '../../domain/value-objects/title.vo';
import { UrlSlugVO } from '../../domain/value-objects/url-slug.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
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
    ): Promise<void> {
        const { body, title, slug, file } = req;

        if (!file) throw new Error();

        const dimensions = await sizeOf(file.path);

        if (!dimensions) throw new Error();

        await this.imageUploadUseCase.execute(
            new UuidVO(body.id),
            new UuidVO(res.userId),
            new TitleVO(title),
            new UrlSlugVO(slug),
            new ImageFormatVO(file.mimetype),
            new IntGtZeroVO(file.size),
            new IntGtZeroVO(dimensions.height || 0),
            new IntGtZeroVO(dimensions.width || 0)
        );

        res.statusCode = 201;
    }
}
