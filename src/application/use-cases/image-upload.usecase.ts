import { inject, injectable } from 'inversify';
import { ImageModel } from '../../domain/models/image.model';
import { IImageRepository } from '../../domain/repository/image-repository.interface';
import { ImageFormatVO } from '../../domain/value-objects/image-format.vo';
import { IntGtZeroVO } from '../../domain/value-objects/int-gt-zero.vo';
import { PreviousDateVO } from '../../domain/value-objects/previous-date.vo';
import { TitleVO } from '../../domain/value-objects/title.vo';
import { UrlSlugVO } from '../../domain/value-objects/url-slug.vo';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';

@injectable()
export class ImageUploadUseCase {
    constructor(
        @inject(ContainerSymbols.ImageRepository)
        private imageRepository: IImageRepository
    ) {}

    async execute(
        id: UuidVO,
        ownerId: UuidVO,
        title: TitleVO,
        slug: UrlSlugVO,
        format: ImageFormatVO,
        size: IntGtZeroVO,
        height: IntGtZeroVO,
        width: IntGtZeroVO
    ): Promise<void> {
        const createdAt = new PreviousDateVO(new Date());

        const image = new ImageModel(
            id,
            ownerId,
            title,
            slug,
            format,
            size,
            height,
            width,
            createdAt
        );

        await this.imageRepository.create(image);
    }
}
