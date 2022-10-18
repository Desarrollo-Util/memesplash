import { FastifyReply, FastifyRequest } from 'fastify';
import { inject } from 'inversify';
import { ImageFindByOwnerUseCase } from '../../application/use-cases/image-find-by-owner.usecase';
import { ContainerSymbols } from '../../symbols';

export class ImageFindByOwnerController {
    constructor(
        @inject(ContainerSymbols.ImageFindByOwnerUseCase)
        private imageFindByOwnerUseCase: ImageFindByOwnerUseCase
    ) {}

    async execute(req: FastifyRequest, res: FastifyReply) {
        const { userId } = req;

        const userImages = await this.imageFindByOwnerUseCase.execute(userId);

        return res.send(userImages);
    }
}
