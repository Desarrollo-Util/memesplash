import { UuidVO } from '@shared/domain/value-objects/uuid.vo';
import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';
import { ContainerSymbols } from '../../../symbols';
import { ImageFindByOwnerUseCase } from '../../application/use-cases/image-find-by-owner.usecase';
import { ImageDto } from '../dtos/image.dto';

@injectable()
export class ImageFindByOwnerController {
    constructor(
        @inject(ContainerSymbols.ImageFindByOwnerUseCase)
        private imageFindByOwnerUseCase: ImageFindByOwnerUseCase
    ) {}

    async execute(
        _req: FastifyRequest,
        res: FastifyReply
    ): Promise<ImageDto[]> {
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
