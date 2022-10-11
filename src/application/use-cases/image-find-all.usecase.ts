import { inject } from 'inversify';
import { IImageRepository } from '../../domain/repository/image-repository.interface';
import { ContainerSymbols } from '../../symbols';

export class ImageFindAllUseCase {
    constructor(
        @inject(ContainerSymbols.ImageRepository)
        private imageRepository: IImageRepository
    ) {}

    async execute() {
        const images = await this.imageRepository.findAll();

        return images.map((image) => ({
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
