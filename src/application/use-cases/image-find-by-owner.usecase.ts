import { inject, injectable } from 'inversify';
import { IImageRepository } from '../../domain/repository/image-repository.interface';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';

@injectable()
export class ImageFindByOwnerUseCase {
    constructor(
        @inject(ContainerSymbols.ImageRepository)
        private imageRepository: IImageRepository
    ) {}

    async execute(ownerId: string) {
        const imageOwnerId = new UuidVO(ownerId);

        const ownerImages = await this.imageRepository.findByOwnerId(
            imageOwnerId
        );

        return ownerImages.map((image) => ({
            id: image.id.value,
            ownerId: image.ownerId.value,
            title: image.title.value,
            slug: image.slug.value,
            format: image.format.value,
            size: image.size.value,
            height: image.height.value,
            width: image.width.value,
            createdAt: image.createdAt.value,
        }));
    }
}
