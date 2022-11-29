import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { ImageFindAllUseCase } from '../../application/use-cases/image-find-all.usecase';
import { ImageDto } from '../dtos/image.dto';

@injectable()
export class ImageFindAllController {
    constructor(
        @inject(ContainerSymbols.ImageFindAllUseCase)
        private imageFindAllUseCase: ImageFindAllUseCase
    ) {}

    async execute(): Promise<ImageDto[]> {
        const images = await this.imageFindAllUseCase.execute();

        return images.map((image) => ({
            id: image.id.value,
            ownerId: image.ownerId.value,
            title: image.title.value,
            slug: image.slug.value,
            format: image.format.value,
            size: image.size.value,
            height: image.height.value,
            width: image.width.value,
            createdAt: image.createdAt.value.getTime(),
        }));
    }
}
