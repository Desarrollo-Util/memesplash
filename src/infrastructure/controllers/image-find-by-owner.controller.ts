import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ImageFindByOwnerUseCase } from '../../application/use-cases/image-find-by-owner.usecase';
import { UuidVO } from '../../domain/value-objects/uuid.vo';
import { ContainerSymbols } from '../../symbols';
import { ImageDtoType } from '../dtos/image.dto';

@injectable()
export class ImageFindByOwnerController {
    constructor(
        @inject(ContainerSymbols.ImageFindByOwnerUseCase)
        private imageFindByOwnerUseCase: ImageFindByOwnerUseCase
    ) {}

    async execute(
        _req: FastifyRequest,
        res: FastifyReply
    ): Promise<ImageDtoType[]> {
        const userId = new UuidVO(res.userId);

        const userImages = await this.imageFindByOwnerUseCase.execute(userId);

        return userImages.map((image) => ({
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
